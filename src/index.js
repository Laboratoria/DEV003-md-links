import { evaluatePath,
  isPathTrue,
  filextname,
  readFileUser,
  getLinks,
  validateLinks,
  joinArrays,
// eslint-disable-next-line import/extensions
} from './functions.js';

// const pathCompleted = 'C:/Users/D_Elizabeth/Laboratoria/proyecto4/DEV003-md-links/PRUEBA1.md';
// const pathRelative ='./PRUEBA1.md';
// const errorPath ='./PRUEBA.md';
const fileName1 = './prueba1.txt';
const pruebaReal = 'C:/Users/D_Elizabeth/Laboratoria/proyecto3/DEV003-social-network/README.md'

// esta función debe retornar una promesa
// resolve y reject son funciones que se pasan al then y chatch
export const mdLinks = (path, option) => new Promise((resolve, reject) => {
// identificar si la ruta es válida e idenfiticar la ruta como relativa o abs
  if (isPathTrue(path)) {
    evaluatePath(path);
    if (filextname(path) === '.md') { // leer los archivos de la ruta, buscar MD
      readFileUser(path) // Leer el contenido del MD
        .then((data) => {
          const links = getLinks(data, path);
          if (option.validate) { // ejecutar la extracción de links deacuerdo a options
            const linksHTTP = validateLinks(links)
              .then((linksHTTP) => {
                const finalResult = joinArrays(links, linksHTTP);
                // console.log(finalResult);
                return finalResult;
              });
            resolve(linksHTTP);
          } else {
            // console.log(links);
            resolve(links);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error('El archivo no tiene terminación .md'));
    }
  } else {
    // eslint-disable-next-line no-console
    // console.log('noooooo puedes pasar a la siguiente función');
    reject(new Error('El path no es válido'));
  }
});

// mdLinks(pathCompleted)
// mdLinks(pruebaReal, { validate: true })
//   .then((links) => links)
//   .catch((error) => (error));

mdLinks(fileName1)
  .then((links) => links)
  .catch((error) => console.log(error.message));
// mdLinks(pathCompleted)
// .then(path => console.log(path))