const { routeExists, absolutePath,
  routeRelative } = require('../src/fsfunction.js');

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
    const pathRoute = 'src/fsfunction.js'
    expect(routeRelative(pathRoute)).toBe('C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\README.md');
  });

});