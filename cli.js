const { mdLinks, absolutePath, transformPath, isADirectory} = require('./index.js');
// const { validatePath } = require('./funciones.js');

const path = process.argv[2];
mdLinks(path)
.then((resolve) => {
	console.log(resolve)
})
.catch((error) => {
	console.log(error)
});