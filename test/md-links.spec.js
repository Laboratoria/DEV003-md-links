const { mdLinks } = require('../src/index');
const api = require('../src/api');
const fs = require('fs');
const nodePath = require('path');

//Dummydata
const relativePath = './text.md'
const filePath = 'C:\\Users\\lurza\\OneDrive\\Documentos\\GitHub\\DEV003-md-links\\texto.md'
const linksFileFalse = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: './texto.md'
}];

const linksFileTrue = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: './texto.md',
    status: 200,
    ok: 'ok'
  }
]

//api test
describe('path valid', () => {
  it('should return if the path is valid', () => {
    expect(api.pathValid('./texto.md')).toBe(true)
  })
})
describe('path is a file', () => {
  it('should return true if the path is a file', () => {
    expect(api.isFile('./texto.md')).toBe(true)
  })
})
describe('read directories', () => {
  it('should read the files in a directory', () => {
    expect(api.readDir('./directorio')).toMatchObject([ 'archivo.md', 'archivodos.md' ])
  })
})

describe('getFile', () => {
  it('should reject files', () => {
    return (api.getFile('./texto.md')).catch((error) => {
      expect(error).toBe('error en el archivo')
    })
  })
})
//Mock mdLinks
jest.mock('../src/index.js', () => ({
  mdLinks: jest.fn(),
}));

describe('mdLinks', () => {


  it('It should validate if is absolute', () => {
    expect(nodePath.isAbsolute(filePath)).toBe(true);
  });
  it('It should turn the path to absolute', () => {
    // console.log(api.turnAbsolut('./texto.md'))
    expect(api.turnAbsolut(relativePath)).toBe('C:\\Users\\lurza\\OneDrive\\Documentos\\GitHub\\DEV003-md-links\\text.md')
  });
  it('It should check if is a .md extension', () => {
    const ext = nodePath.extname(filePath);
    expect(ext).toBe('.md');
  })
  it('It should reject if the path does not exist', () => {
    mdLinks.mockImplementationOnce(() => Promise.reject('La ruta no existe'));
    return (mdLinks('./doesnotexist.md')).catch((error) => {
      expect(error).toBe('La ruta no existe')
    })
  });

  it('should return an object array (href,text,file)', () => {
    mdLinks.mockImplementationOnce(() => Promise.resolve(
      [{
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './texto.md'
      }]
    ));
    return mdLinks(filePath, false).then((res) => {
      expect(res).toEqual(linksFileFalse)
    })
  })
  it('should return an object array (href,text,file,status,ok)', () => {
    mdLinks.mockImplementationOnce(() => Promise.resolve(
      [{
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: './texto.md',
        status: 200,
        ok: 'ok'
      }]
    ));
    return mdLinks(filePath, true).then((res) => {
      expect(res).toEqual(linksFileTrue)
    })
  })

});
