const fs = require('fs');
const path = require('path');


//.......Identificar si la ruta existe - retorna true o false.......

const routeExists = (route) => fs.existsSync(route);

//.......Identificar si la ruta es absoluta - retorna true o false.......

const absolutePath = (pathRoute) => path.isAbsolute(pathRoute);

//.......Si la ruta es relativa convertir a absoluta.......

const routeRelative = (pathRoute) =>  absolutePath(pathRoute) ? pathRoute : path.resolve(pathRoute) ;
// console.log(routeRelative('src\\API.js'))

//.......Si la ruta es un directorio.......
const ifItsAdirectory = (route) => fs.statSync(route).isDirectory();
// console.log(ifItsAdirectory('src\\fsfunction.js'))
// C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas

//.......Si es un directorio que lo lea.......

const directory = (route) => fs.readdirSync(route);


//.......Si la ruta es un archivo.......
const ifItsAFile = (path) => fs.statSync(path).isFile();

//.......Para saber si es un archivo MD.......

const typeFile = (pathRoute) => path.extname(pathRoute) === '.md' ? true : false;



//.......Si es un directorio lo recorra y si no consultar si es un archivo .md.......

const getfilesArray = (routePath) => {
  let filesArray = [];
  if (ifItsAdirectory(routePath)) {
    directory(routePath).forEach((element) => {
      const newPath = path.join(routePath, element);
      const newArray = getfilesArray(path.resolve(newPath));
      filesArray = filesArray.concat(newArray);
    });
    }else if(!ifItsAdirectory(routePath) && typeFile(routePath)) {
    filesArray.push(routePath);
  }
  return filesArray;
  };
// console.log(getfilesArray('Pruebas'));
//.......Leer archivo .md.......

const fileRead = (routePath) => {
  return new Promise((resolve, reject) => {
      fs.readFile(routePath, 'utf8', (error, data) => {
      if(error){
        reject('Inválido')
      }
      resolve(data)
    });
  })
}
// fileRead('.\\Pruebas\\README2.md').then((data) => {
//   console.log(data);
// }).catch(error => console.log(error))




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
// // // console.log(searchLinks('fsfunction.js', '[Markdown](https://regexr.com/) [Node](https://nodejs.org/api/fs.html)' ))
// fileRead('.\\Pruebas\\README2.md').then((data) => {
//   console.log('data', data)
//   console.log(searchLinks('.\\Pruebas\\README2.md', data));
// }).catch(error => console.log(error))

// fileRead(routePath).then(content=>{
//   const search = searchLinks(path, content)
// })

//.......Para saber el status.......
const statusLink = contentLinks => {
  return new Promise(resolve => {
      let array = [];
      contentLinks.forEach(link => {
        const promiseFetch = fetch(link.href)
        array.push(promiseFetch)
      })
      Promise.allSettled(array).then(result => {
        // console.log(result)
        let okResult = ''
        for (let i = 0; i < result.length; i++) {
          if (result[i].status === 'fulfilled') {
            // console.log('hola')
            result[i].value.ok ? (okResult = 'ok') : (okResult = 'fail')
            contentLinks[i].status = result[i].value.status
            contentLinks[i].ok = okResult
          } else {
            okResult = 'fail'
            contentLinks[i].status = 404
            contentLinks[i].ok = okResult
          }
          // console.log(contentLinks)
          resolve(contentLinks)
          
        }
      })
    })
  }

    fetch ('https://ui-avatars.com/api/?name=John+Doe')
  .then(img => {
  console.log(img)
}).catch(ex => {
  console.error(ex);
})


  
// fileRead('.\\Pruebas\\README2.md').then((data) => {
//   statusLink( searchLinks('.\\Pruebas\\README2.md', data)).then(console.log)
// })

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
