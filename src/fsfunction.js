const fs = require('fs');
const path = require('path');

//.......Identificar si la ruta existe - retorna true o false.......

const routeExists = (route) =>  fs.existsSync(route) ;
if(routeExists('src/API.js')){
console.log('La ruta existe');
}

//.......Identificar si la ruta es absoluta - retorna true o false.......

const absolutePath = (pathRoute) => path.isAbsolute(pathRoute);
if(absolutePath('C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\README.md')){
  console.log('La ruta es absoluta');
  }
//.......Si la ruta es relativa convertir a absoluta.......

const routeRelative = (pathRoute) => {absolutePath(pathRoute) ? pathRoute : path.resolve(pathRoute)};

//.......Si la ruta es un directorio.......

const directory = (route) => fs.statSync(route).isDirectory();

//.......Para saber que tipo de archivo es.......

const typeFile = (pathRoute) => path.extname(pathRoute);

//.......Si es un directorio que lo lea.......
module.exports = {
    routeExists,
    absolutePath,
    routeRelative,
    directory,
    typeFile
  };
  