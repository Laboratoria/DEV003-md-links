const {routeExists,
  absolutePath,
  routeRelative,
  ifItsAFile,
  typeFile,
  directory,
  getfilesArray,
  fileRead,
  searchLinks,
  statusLink } = require('./fsfunction.js')


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let abspath = path;
    if (!routeExists(path)) {
      reject(`${path} not the right path.`);
    } else {
      if (!absolutePath(path)) {
        abspath = routeRelative(path);
      };
      if (!ifItsAFile(abspath)) {
        const directoryContent = directory(abspath);
        if (directoryContent.length === 0) {
          reject(`The directory ${path} is empty`);
        } else {
          const allFilePaths = getfilesArray(abspath, arrayOfFiles = []);
          const promises = [];
          allFilePaths.forEach((filePath) => {
            promises.push(mdLinks(filePath, options));
          });
          Promise.allSettled(promises)
            .then((results) => {
              const arrayResults = [];
              for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result.status === 'fulfilled') {
                  const res = result.value;
                  for (let x = 0; x < res.length; x++) {
                    const object = res[x];
                    arrayResults.push(object);
                  };
                };
              };
              resolve(arrayResults);
            });
        };
      } else {
        if (!typeFile(abspath)) {
          reject(`The file ${path} is not .md file.`);
        } else {
          fileRead(abspath)
            .then((mdContent) => {
              const allLinks = searchLinks(abspath, mdContent);
              if (allLinks.length === 0) {
                reject(`This file ${path} doesn't have links.`);
              } else {
                if (!options.validate) {
                  resolve(allLinks);
                } else {
                  resolve(statusLink(allLinks));
                };
              };
            })
            .catch((error) => {
              reject(error);
            });
        };
      };
    };
  });
};

// mdLinks('.\\Pruebas\\Pruebas.md', { validate: false })
//     .then(result => console.log(result))
//     .catch(error => console.error(error))


// mdLinks('.\\Pruebas\\README2.md', { validate: true })
//     .then(result => console.log(result))
//     .catch(error => console.error(error))


module.exports = {
 mdLinks,  

};
