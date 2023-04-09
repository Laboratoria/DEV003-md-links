import fs from 'fs';
import readline from 'readline';
import path, { resolve }  from 'path';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import url  from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));


// elementos de prueba
const fileName1 = './prueba1.txt',
    fileName2 = './PRUEBA1.md',
    folderPath1 = 'C:/Users/D_Elizabeth/Laboratoria/proyecto4/DEV003-md-links',
    folderPath2 = './DEV003-md-links',
    pathCompleted = 'C:/Users/D_Elizabeth/Laboratoria/proyecto4/DEV003-md-links/PRUEBA1.md';

// ---------Evalua que el path sea abs y hace la lectura del abs-------
export const evaluatePath = (pathUser) => {
    let pathNormalize = pathUser;
    if(path.isAbsolute(pathUser)){
        return pathUser
        //console.log('El path es abs');
    }else{
        pathNormalize = path.resolve(pathNormalize).replace(/\\/g, '/');
        //pathNormalize = path.resolve(__dirname);
        //console.log('se normalizo1', pathNormalize)
        //pathNormalize = path.normalize(pathUser);
        //console.log('se normalizo2', pathNormalize)
        //pathNormalize = path.join(pathNormalize, pathUser);
        //console.log('se normalizo3', pathNormalize)
    }
        return pathNormalize;
};
// const result = evaluatePath(fileName2);
// console.log('resultado prueba if else', result, 'fin');

//----------Evalua si existe el path-------------
export const isPathTrue = pathUser => fs.existsSync(pathUser);

// -------------retorna el contenido de un dir ---------------
export const contentDir = (pathUser) => fs.readdirSync(pathUser);
//console.log('34 contenido de un dir ', contentDir(folderPath1));

// ------------- función para conocer la extensión---------------
export const filextname = pathUser => path.extname(pathUser);
//console.log('38 extensión: ', filextname (fileName1));

// ----------- función para unir path y el archivo ------------
export const joinPath = (pathAbs, file)=> path.join(pathAbs, file);
//console.log('42 path final', joinPath(evaluatePath(folderPath2),fileName1));


// ------------ leer de forma asincrona ----------------------
/* esta función lee mi archivo y regresa una promesa de la data que queda lista para enlazarse con otra promesa,
devuelve el texto listo para la siguiente función*/
export const readFileUser = (pathUser) =>{
    return new Promise (function(resolve, reject){
        fs.readFile(pathUser, 'utf8', (error, data) => {
            if(error){
                reject('hay un error con el path');
            }
            //console.log(data, pathUser)
            resolve(data);
        });
    });
};

// ----------- Obtiene los links de un md ------------------- https://nodejs.org/api/url.html
export const getLinks = (data, pathUser) => {
    let arrayLinks = [];
    var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression);
    let dataLinks = data.match(regex);
    //console.log('64', dataLinks)
    for(let i = 0; i < dataLinks.length; i++){
        let hostLink = new URL (dataLinks[i]);
        arrayLinks.push({
            href: dataLinks[i].replace(')', ''),
            host : hostLink.host,
            pathText: pathUser
        })
    }
    //console.log('arrayLinks', arrayLinks);
    return arrayLinks
};
//console.log('79', readFileUser(pathCompleted).then(data => getLinks(data, pathCompleted)));

// --------------- realiza las peticiones HTTP---------------------------------------- me falta juntar las promesas???
// export const validateLinks = (arrayLinks) =>{
//     arrayLinks.forEach(link => {
//         let linkHref=link.href;
//         console.log('links',linkHref)
//         fetch(linkHref, {method: 'HEAD'})
//         .then(function(response){
//             if (response.status >= 200 && response.status < 400 ){
//                 link.status = response.status;
//                 link.ok = 'ok';
//                 console.log('response', response)
//                 //console.log('result', arrayLinks);
//                 // console.log('ok', link, response.status)
//             }else{
//                 link.status = response.status;
//                 link.ok = 'fail';
//                 //console.log('result', arrayLinks);
//                 //console.log('fail', link, response.status)
//             }
//         })
//     });
// };
//console.log('58', readFileUser(pathCompleted)); 

// console.log('97', 
// readFileUser(pathCompleted)
// .then(data => getLinks(data, pathCompleted))
// .then (data => validateLinks(data))
// );
export const petitionHTTP = (link) => {
    return new Promise ((resolve, reject)=>{    
        fetch(link, {method: 'HEAD'})
        .then(response => {   
            let petition = new Object;       
                if (response.status >= 200 && response.status < 400 ){
                    petition.Status= response.status,
                    petition.ok= 'ok';
                }else{
                    petition.Status= response.status,
                    petition.ok= 'fail';
                };
                resolve(petition)
        })
        .catch(error => {
                console.error(`Ocurrió un error al validar el enlace: ${error}, status: ${error.response ? error.response.status : 'desconocido'}`)
                reject(error)
            });
    });
}
// const linkPrueba='https://css-tricks.com/oohcrap/'
// petitionHTTP(linkPrueba).then((result)=>console.log('se termino el fetch', result));

export const validateLinks = (arrayLinks) =>{
    let promises = arrayLinks.map(link => {
        let linkHref=link.href;
        return petitionHTTP(linkHref);
    });
    return Promise.all(promises);
};

// console.log('97', 
// readFileUser(pathCompleted)
// .then(data => getLinks(data, pathCompleted))
// .then (data => validateLinks(data)
//         .then((results)=>{
//             console.log(results);
//         }).catch((error) => {
//             console.error(error);
//         })
//   ));
  
export const joinArrays = (array1, array2) =>{
    return array1.map((obj, i) => {
        return Object.assign({}, obj, array2[i]);
    });
};
// ------------------Prueba de unión de objetos ---------------
// const n1 = [{nombre: 'diana'}, {nombre: 'Andrea'}, {nombre: 'Felix'}];
// const n2 = [{apellido: 'hernande'}, {apellido: 'Garcia'}, {apellido: 'bonito'}];
// console.log(joinArrays(n1, n2));