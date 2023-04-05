const { mdLinks } = require('../src/mdLinks.js');

describe('test mdlinks', () => {
  
  test('si validate es false, deberia retornar un array con 3 propiedades.', () => {
    const output = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba1\\prueba2\\prueba.md'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github',
        file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba1\\prueba2\\prueba.md'
      }
    ];
    return expect(mdLinks('../DEV003-md-links/prueba1/prueba2/prueba.md', { validate: false })).resolves.toEqual(output);
  });

  test('si validate es true, deberia retornar un array con 5 propiedades.', () => {
    const output = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba1\\prueba2\\prueba.md',
        status: 200,
        statusText: 'ok'
      },
      {
        href: 'https://github.com/kenruizinouett-node-fetch-ejemplo/blob/app.js',
        text: 'Github',
        file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba1\\prueba2\\prueba.md',
        status: 404,
        statusText: 'fail'
      }
    ];
    return expect(mdLinks('../DEV003-md-links/prueba1/prueba2/prueba.md', { validate: true })).resolves.toEqual(output);
  });

  test('si la ruta no existe debe devolver el mensaje de error.', () => {
    const error  = 'path does not exist';
    return expect(mdLinks('../DEV003-md-links/prueba1/prueba2/prueba2.md')).rejects.toEqual(error);
  });
});