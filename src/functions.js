import fs from 'fs';
import readline from 'readline';
import path  from 'path';
import { readdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


// elementos de prueba
const fileName1 = './prueba1.txt',
    fileName2 = './PRUEBA1.md',
    folderPath1 = 'C:/Users/D_Elizabeth/Laboratoria/proyecto4/DEV003-md-links',
    folderPath2 = './DEV003-md-links',
    pathCompleted = 'C:/Users/D_Elizabeth/Laboratoria/proyecto4/DEV003-md-links/prueba1.txt';

// ---------Evalua que el path sea abs y hace la lectura del abs-------
export const evaluatePath = (pathUser) => {
    if(path.isAbsolute(pathUser)){
        console.log('El path es abs');
        return pathUser;
    }else{
        pathUser = path.resolve(__dirname);
        pathUser= path.normalize(pathUser);
        return pathUser;

    }
}; 
// const result = evaluatePath(folderPath2);
// console.log('resultado prueba if else', result, 'fin');

// -------------retorna el contenido de un dir ---------------
export const contentDir = (pathUser) => fs.readdirSync(pathUser);
  console.log('34 contenido de un dir ', contentDir(folderPath1));

// ------------- función para conocer la extensión---------------
export const filextname = pathUser => path.extname(pathUser);
console.log('38 extensión: ', filextname (fileName1));

// ----------- función para unir path y el archivo ------------
export const joinPath = (pathAbs, file)=> path.join(pathAbs, file);
console.log('42 path final', joinPath(evaluatePath(folderPath2),fileName1));


// ------------ leer de forma asincrona ----------------------
// esta promesa queda lista para enlazarse con otra promesa, devuelve el texto listo para la siguiente función
export const readFileUser = (pathUser) =>{
    return new Promise (function(resolve, reject){
        fs.readFile(pathUser, 'utf8', (error, data) => {
            if(error){
                reject('hay un error con el path');
            }
            console.log(data)
            return resolve(data);
        });
    });
};
console.log('58', readFileUser(pathCompleted)); 

// ----------- Obtiene los links de un md -------------------
export const getLinks = (pathUser, data) => {
const arrayLinks = [];

}