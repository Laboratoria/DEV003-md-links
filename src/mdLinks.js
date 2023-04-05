const functions = require('./api.js');

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        if (!functions.pathExists(path)) {
            reject('path does not exist')
        }
        else {
            const allPaths = functions.readAll(path) // arreglo con todas las rutas absolutas
            //console.log('allPaths: ', allPaths);

            for (let i = 0; i < allPaths.length; i++) {
                
                const allData = functions.readDoc(allPaths[i]) //leer contenido de cada elemento
                allData.then((data) => {
                    const allLinks = functions.getLinks(data, allPaths[i]) //links de cada elemento
                if(!(options.validate)){
                    resolve(allLinks)
                }
                else{
                    const allStatus = functions.getStatus(allLinks) //validar links de cada elemento
                    allStatus.then((result) => resolve(result))
                }
            })
            };
        }
    });
}


// const path = '../DEV003-md-links/prueba1';
// mdLinks(path, { validate: false })
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error))


// const resultado2 = '../DEV003-md-links/prueba1/prueba2/prueba.md';
// mdLinks(resultado2, { validate: true })
//     .then((res) => console.log(res))
//     .catch((error) => console.log(error))




module.exports = { mdLinks }

// let allLinks = [];
// for (let i = 0; i < results.length; i++) {                   
        
//         const arrayLinks = functions.getLinks(results[i], allPaths[i]);
//         //console.log('arrayLinks: ', arrayLinks);
//         allLinks = allLinks.concat(arrayLinks);
//         //console.log('allLinks: ', allLinks);
//         if(!options.validate) {
//         resolve(allLinks) }
  // Promise.all(promisesData).then(results => {    
            //     //if (!options.validate) {
// }
//resolve(allLinks);
//}
// else{
//     functions.getStatus(allLinks).then((result) => resolve(result)
// }