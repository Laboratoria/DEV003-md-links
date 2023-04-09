import { evaluatePath,
    isPathTrue,
    contentDir,
    filextname,
    joinPath,
    readFileUser,
    getLinks,
    validateLinks, 
    joinArrays
} from './functions.js';

const pathCompleted = 'C:/Users/D_Elizabeth/Laboratoria/proyecto4/DEV003-md-links/PRUEBA1.md';
const pathRelative ='./PRUEBA1.md';
const errorPath ='./PRUEBA.md';
const fileName1 = './prueba1.txt';
const pruebaReal = 'C:/Users/D_Elizabeth/Laboratoria/proyecto3/DEV003-social-network/README.md'

//esta función debe retornar una promesa
//resolve y reject son funciones que se pasan al then y chatch
const mdLinks = (path, option) => {
return new Promise ((resolve, reject) => {
// identificar si la ruta es válida e idenfiticar la ruta como relativa o abs
    if(isPathTrue(path)){
        evaluatePath(path)
        if(filextname (path)=== '.md'){ //leer los archivos de la ruta, buscar MD
         readFileUser(path) // Leer el contenido del MD
            .then(data => {
                let links = getLinks(data, path);
                if(option.validate){ // ejecutar la extracción de links deacuerdo a options
                    let linksHTTP = validateLinks(links)
                        .then((linksHTTP)=>{
                        let finalResult = joinArrays(links, linksHTTP);
                        console.log(finalResult);
                        })
                    resolve(linksHTTP)
                }else{
                    console.log(links)
                    resolve (links)
                };
            })
            .catch(error=>{
                reject(`no hay links ${error}`)
            })
        }else{
            reject('no hay archivos md, o el path no es válido')
        }
    }else{
        console.log('noooooo puedes pasar a la siguiente función');
        reject()
    }
})
}

//mdLinks(pathCompleted)
mdLinks(pruebaReal, {validate:true})
//mdLinks(fileName1)
//mdLinks(pathCompleted)
//.then(path => console.log(path))
.then(links=> links)
.catch(error => console.error('hubo un error', error));
