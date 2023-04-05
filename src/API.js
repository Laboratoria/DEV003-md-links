const { routeExists, routeRelative, statusLink, searchLinks, fileRead } = require('./fsfunction.js')


const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        const absolute = routeRelative(path);
        if (!routeExists(absolute)) {
            reject(`El archivo ${path} no es md`);
          } else {
            fileRead(absolute)
              .then((mdContent) => {
                const allLinks = searchLinks(absolute, mdContent);
                if (allLinks.length === 0) {
                  // console.log(allLinks)
                  reject(`El archivo md ${path} no tiene links.`);
                } else {
                  if (!options.validate) {
                    resolve(allLinks);
                  } else {
                    statusLink(allLinks).then(resolve);
                  };
                };
              })
              .catch((error) => {
                reject(error);
              });
            }
    })
}

// mdLinks('.\\Pruebas\\Pruebas.md', { validate: false })
//     .then(result => console.log(result))
//     .catch(error => console.error(error))

// mdLinks('.\\Pruebas\\README2.md', { validate: true })
//     .then(result => console.log(result))
//     .catch(error => console.error(error))


module.exports = {
    mdLinks,
}