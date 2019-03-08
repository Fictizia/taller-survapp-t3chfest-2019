# Taller del T3chfest'19
### Desarrolla tu Survival Alert con Node.js

![Banner Molón](OTROS/SurvApp-header.png)

### Módulos 

- [`lib/air.js`](lib/air.js)
- [`lib/cameras.js`](lib/cameras.js)
- [`lib/earthquakes.js`](lib/earthquakes.js)
- [`lib/global.js`](lib/global.js)
- [`lib/maps.js`](lib/maps.js)
- [`lib/news.js`](lib/news.js)

### Helpers 

- [`helpers/cli.js`](helpers/cli.js)

### Survapp CLI

**Demo Earthquakes**
![gif-demo](/OTROS/survapp-cli-earthquakes/large.gif)


**Demo Help**
![gif-demo](/OTROS/survapp-cli-help/large.gif)


**Demo Images**

![gif-demo](/OTROS/survapp-cli-images/large.gif)


**Demo News**
![gif-demo](/OTROS/survapp-cli-news/large.gif)

 
### Survapp CLI en detalle

**Usar el módulo**
- Instalar dependencias `npm install`.
- Ejecuta `node survapp.cli.js`.
- Debes añadir tus tokens en `config.js`.
- Explorar la carpeta `/lib` y `/helper` para entender el funcionamiento de todos los módulos.

**Dependencias**
- [Got](https://www.npmjs.com/package/got) *Got is a human-friendly and powerful HTTP request library.*
```js
const got = require('got');
 
(async () => {
    try {
        const response = await got('sindresorhus.com');
        console.log(response.body);
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();
```

- [puppeteer](https://www.npmjs.com/package/puppeteer) *Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol.*
```js
const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});
 
  await browser.close();
})();
```

- [chalk](https://www.npmjs.com/package/chalk) *Terminal string styling done right*
```js
const chalk = require('chalk');
 
console.log(chalk.blue('Hello world!'));
```

- [terminal-image](https://www.npmjs.com/package/terminal-image) *Display images in the terminal*

```js
const terminalImage = require('terminal-image');
 
(async () => {
    console.log(await terminalImage.file('unicorn.jpg'));
})();
```
