const puppeteer = require('puppeteer');

exports.globalStatus = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.gdacs.org/');
    const data = await page.evaluate(() => {

        function cleanData(element) {
            const items = element.querySelectorAll(".alert_item");
            return [...items].map(item => {
                return {
                    name: item.querySelector(".alert_item_name").innerText,
                    date: item.querySelector(".alert_date").innerText.trim().replace("- ", ""),
                    url: item.querySelector("a").href,
                }
            });
        }

        const columns = document.querySelectorAll(".main_alert_box_3");
        return [{
            name: "Earthquakes",
            data: cleanData(columns[0])
        }, {
            name: "Tropical Cyclones",
            data: cleanData(columns[1])
        }, {
            name: "Floods",
            data: cleanData(columns[2])
        }, {
            name: "Volcano",
            data: cleanData(columns[3])
        }, {
            name: "Droughts",
            data: cleanData(columns[4])
        }];
    });

    await browser.close();
    return data;
};