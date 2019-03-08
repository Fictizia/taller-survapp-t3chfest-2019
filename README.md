# Taller del T3chfest'19
### Desarrolla tu Survival Alert con Node.js


![img](OTROS/Sfearthquake3b.jpg)

> Fires of the 1906 San Francisco earthquake [Wikipedia](https://en.wikipedia.org/wiki/Earthquake)


### Equakes BOT

**Demo**

![demo_gif](OTROS/large.gif)

### Módulo equakes

**Usar el módulo**
- Instalar dependencias `npm install`
- Acualizar `config.js` con tus tokens
- Lanzar el módulo `node equakes.bot.js`
- Explorar `lib/earthquakes.js` y `/equakes.bot.js` para entender el funcionamiento.

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