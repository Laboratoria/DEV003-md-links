const fs = require('fs');
const path = require('path');


//.......Identificar si la ruta existe - retorna true o false.......

const routeExists = (route) => fs.existsSync(route);

//.......Identificar si la ruta es absoluta - retorna true o false.......

const absolutePath = (pathRoute) => path.isAbsolute(pathRoute);

//.......Si la ruta es relativa convertir a absoluta.......

const routeRelative = (pathRoute) =>  absolutePath(pathRoute) ? pathRoute : path.resolve(pathRoute) ;
console.log(routeRelative('src\\API.js'))
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
  return new Promise((resolve, reject) => {
     return fs.readFile(routePath, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    });
  })
}

//.......Para extraer los links.......
const searchLinks = (route, content) => {
  const regExMdlinks = /\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g;
  // console.log(...content.matchAll(regExMdlinks))
    const links = Array.from(content.matchAll(regExMdlinks), link => ({
        href: link[2],
        text: link[1],
        file: route,
    }));
    return links;
}
console.log(searchLinks('fsfunction.js', '[Markdown](https://regexr.com/) [Node](https://nodejs.org/api/fs.html)' ))
// .......Para saber el status.......

const statusLink = path => {
  return new Promise(resolve => {
    searchLinks(path).then(arrayResult => {
      let array = []
      arrayResult.forEach(link => {
        const promiseFetch = fetch(link.href)
        array.push(promiseFetch)
      })
      Promise.allSettled(array).then(result => {
        let okResult = ''
        for (let i = 0; i < result.length; i++) {
          if (result[i].status === 'fulfilled') {
            result[i].value.ok ? (okResult = 'ok') : (okResult = 'fail')
            arrayResult[i].status = result[i].value.status
            arrayResult[i].ok = okResult
          } else {
            okResult = 'fail'
            arrayResult[i].status = 404
            arrayResult[i].ok = okResult
          }
          resolve(arrayResult)
        }
      })
    })
  })
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
  statusLink

};
