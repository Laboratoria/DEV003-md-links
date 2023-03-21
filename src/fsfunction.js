const fs = require('fs');
const path = require('path');
const marked = require('marked');

//.......Identificar si la ruta existe - retorna true o false.......

const routeExists = (route) => fs.existsSync(route);

//.......Identificar si la ruta es absoluta - retorna true o false.......

const absolutePath = (pathRoute) => path.isAbsolute(pathRoute);

//.......Si la ruta es relativa convertir a absoluta.......

const routeRelative = (pathRoute) => { absolutePath(pathRoute) ? pathRoute : path.resolve(pathRoute) };

//.......Si la ruta es un directorio.......

const ifItsAdirectory = (route) => fs.statSync(route).isDirectory();

//.......Si es un directorio que lo lea.......

const directory = (route) => fs.readdirSync(route);


//.......Si la ruta es un archivo.......
const ifItsAFile = (path) => fs.statSync(path).isFile();

//.......Para saber si es un archivo MD.......

const typeFile = (pathRoute) => path.extname(pathRoute) === '.md' ? true : false;


//.......Si es un directorio lo recorra y si no consultar si es un archivo .md.......

const getfilesArray = (routePath) => {
  let filesArray = [];
  absolutePath;

  if (!ifItsAdirectory(route) && typeFile(pathRoute)) {
    filesArray.push(routePath);

  } else if (ifItsAdirectory(route)) {
    directory(route).forEach((element) => {
      const newPath = path.join(route, element);
      const newArray = getfilesArray(path.resolve(newPath));
      filesArray = filesArray.concat(newArray);
    })
  }
  return filesArray;
};

//.......Leer archivo .md.......

const fileRead = (routePath) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(routePath, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })
}

//.......Para extraer los links.......
const searchLinks = (route) => {
  let arrayLinks = [];
  const renderer = new marked.Renderer();
  const ArrayGetMd = getfilesArray(route);
  ArrayGetMd.forEach((file) => {
    renderer.link = (href, title, text) => {
      const objLinks = {
        href,
        text,
        file,
      };
      //extration links
      arrayLinks.push(objLinks);
    };
    marked(readFile(file), { renderer });
  });
  return arrayLinks;
}


module.exports = {
  routeExists,
  absolutePath,
  routeRelative,
  ifItsAdirectory,
  ifItsAFile,
  typeFile,
  directory,
  getfilesArray,
  fileRead,
  searchLinks,


};
