const {routeExists} = require('./fsfunction.js');


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if(!routeExists(path)){
            reject('La ruta no existe')
            return
        }
        resolve(path)
    })


}

mdLinks('Pruebas\\Pruebas.md', {
    validate: true,
    stats: false,
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)

})


