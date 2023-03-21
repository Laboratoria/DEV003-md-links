const { routeExists, absolutePath,
  routeRelative, ifItsAdirectory, ifItsAFile, typeFile } = require('../src/fsfunction.js');

//---Test para si existe la ruta
describe('routeExists', () => {

  it('should return true', () => {
    const route = 'src/fsfunction.js'
    expect(routeExists(route)).toBe(true);
  });

});

//---Test si la ruta es absoluta
describe('absolutePath', () => {

  it('should return false', () => {
    const route = 'src/function.js'
    expect(absolutePath(route)).toBe(false);
  });
  it('should return true', () => {
    const route = 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\README.md'
    expect(absolutePath(route)).toBe(true);
  });
});

//---Test si la ruta es relativa y pasarla a absoluta
describe('routeRelative', () => {

  it('should return an absolute route', () => {
    const pathRoute = 'README.md'
    expect(routeRelative(pathRoute)).toBe('C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\README.md');
  });
});

//---Test para saber si es un directorio
describe('ifItsAdirectory', () => {
  it('should return a directory .', () => {
    const path = 'README.md'
    expect(ifItsAdirectory(path)).toBe(false)
  })
});

//---Test para saber si es un archivo
describe('ifItsAFile', () => {
  it('should return a directory .', () => {
    const path = 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links'
    expect(ifItsAFile(path)).toBe(false)
  })
});

// -------------Si debe retornar la extension del archivo --------

describe('typeFile', () => {
  it('should return a extension file .', () => {
    const path = 'README.md'

    expect(typeFile(path)).toBe(true)
  })
});