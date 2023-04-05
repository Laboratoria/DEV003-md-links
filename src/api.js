
const path = require('path'); // importar ruta
const fs = require('fs'); // file system
const fetch = require('node-fetch');
const { resolve } = require('path');
const { dir } = require('console');

 const route = 'prueba.md';
// const route = 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba';
// const route = 'C:\Users\vanne\Laboratoria\DEV003-md-links\prueba.md';
const data = '[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado [Google](http://google.com/)';
// const data = 'es un lenguaje de marcado';
const arrayLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\README.md'
  },
  {
    href: 'https://github.com/kenruizinoue/tt-node-fetch-ejemplo/blob/app.js',
    text: 'Github',
    file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\README.md'
  },]



// verifica que la ruta existe
const pathExists = (filePath) => {
  return fs.existsSync(filePath);
}

// verifica que sea absoluta
const isAbsolute = (filePath) => {
  return path.isAbsolute(filePath);
}

// convierte a absoluta
const toAbsolute = (filePath) => {
  return path.resolve(filePath);
}

// validar ruta
const validatePath = (filePath) => {
  if (isAbsolute(filePath) === false) {
    return toAbsolute(filePath);
  }
  else {
    return filePath;
  }
}

// valida si es un directorio
const isDirectory = (filePath) => {
  return fs.statSync(filePath).isDirectory();
}

// valida si es un archivo
const isFile = (filePath) => {
  return fs.statSync(filePath).isFile();
}

// valida si es un md
const isMD = (filePath) => {
  if (path.extname(filePath) === '.md') {
    return true;
  }
  else
    return false;
}

// leer archivo
const readDoc = (filePath) => {  
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject('error');
      }
      resolve(data); //string
    });
  })
}


// readDoc(route)
// .then((res) => console.log(res))
// .catch((error) => console.log(error))

// expresion regular 
const regExp = /\[([\w\s.]+)\]\((((http|https):\/\/)[\w./?=-]+)\)/gm;
const regExpHref = /((http|https):\/\/)[\w./?\-=]+/gm      //links
const regExpText = /\[([\w\s.]+)\]/gm      // info

// verificar si hay links
const getLinks = (data, filePath) => {
  // const file = readDoc(filePath);
  const arrayLinks = [];
  const links = data.match(regExp);
  if (links) {
    for (let i = 0; i < links.length; i++) {
      arrayLinks.push({
        href: links[i].match(regExpHref).join(),
        text: links[i].match(regExpText).join().slice(1, -1),
        file: filePath,
      })
    }
  }
  else {
    console.log('Links do not exist')
  }
  return arrayLinks;
}

//Obtener status de los links
const getStatus = (array) => {
  return new Promise((resolve) => {
    let arrayStatus = [];
    for (let i = 0; i < array.length; i++) {
      fetch(array[i].href)
        .then((response) => {
          const objLinks = {
            href: array[i].href,
            text: array[i].text,
            file: array[i].file,
            status: response.status,
            statusText: response.status >= 200 && response.status <= 299 ? "ok" : "fail",
          }
          arrayStatus.push(objLinks);
          if (arrayStatus.length === array.length) {
            resolve(arrayStatus);
          }
          // console.log('arrayLinks', arrayStatus);
          // return arrayStatus;
        })
        .catch((err) => {
          const objLinks = {
            href: array[i].href,
            text: array[i].text,
            file: array[i].file,
            status: 'Error ' + err,
            statusText: 'fail',
          };
          arrayStatus.push(objLinks);
          //console.log('arrayLinks', arrayStatus);
          //return arrayStatus;
          if (arrayStatus.length === array.length) {
            resolve(arrayStatus);
          }
        });
      // resolve(arrayStatus);
    };
  });
};

// console.log(getStatus(arrayLinks));

// Leer directorio
const readDir = (filePath) => {
  return fs.readdirSync(filePath);
}

//Juntar la ruta
const joinFilewithPath = (route) => {
  return readDir(route).map((index) => path.join(route, index));
};

// Array con todos los md de las carpetas
const readAll = (filePath) => {
  let arrayAllFiles = [];
  let absPath = validatePath(filePath);
  //console.log(absPath)

  if (isFile(absPath) && isMD(absPath)) {
    arrayAllFiles.push(absPath);

  }
  else if (isDirectory(absPath) && readDir(absPath).length > 0) {
    const files = joinFilewithPath(absPath);
    for (let i = 0; i < files.length; i++) {
      const newPath = readAll(files[i]);
      arrayAllFiles = arrayAllFiles.concat(newPath);
    }
  }
  return arrayAllFiles;
};

module.exports = {
  pathExists, 
  isAbsolute, 
  toAbsolute, 
  validatePath, 
  isFile, 
  isDirectory, 
  isMD, 
  readDoc, 
  getLinks, 
  getStatus, 
  readDir, 
  readAll,
  joinFilewithPath,
}

// const resultado = '../DEV003-md-links/prueba1/prueba2/prueba.md';
// readDoc(resultado)
//     .then((data) => console.log(getLinks(data,resultado)))
//     .catch((error) => console.log(error))



