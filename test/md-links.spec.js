const { routeExists, absolutePath,
  routeRelative, ifItsAdirectory, ifItsAFile, typeFile, directory, searchLinks, fileRead, getfilesArray, statusLink } = require('../src/fsfunction.js');


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
  it('should return a file .', () => {
    const path = 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links'
    expect(ifItsAFile(path)).toBe(false)
  })
});

//---Test si es un directorio que lo lea
describe('directory', () => {
  it('read a directory', () => {
    const path = 'Pruebas'
    expect(directory(path)).toEqual(['Pruebas.md', 'README2.md'])
  })
});

// -------------Si debe retornar la extension del archivo --------

describe('typeFile', () => {
  it('should return a extension file .', () => {
    const path = 'README.md'

    expect(typeFile(path)).toBe(true)
  })
});


// -------------Recorra el directorio --------
describe('should return an array paths of .md files', () => {
  test('its a function', () => {
    expect(typeof getfilesArray).toBe("function");
  });
});

describe('extracts into an array paths of .md files', () => {
  const route = 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas';
  it('returns an array with file extension md', () => {

    const arrayMd = [
      'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas\\Pruebas.md',
      'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas\\README2.md',
    ];

    expect(getfilesArray(route)).toEqual(arrayMd);
  });
});


// -------------Leer un archivo .md--------
describe('fileRead', () => {
  it('should return a md fileRead', () => {
    const path = './README2.md'

    return fileRead(path)
      .then(result => {
        // console.log(typeof re)
        expect(result).toBe(typeof string)
      })
      .catch(error => {
        {
          error
        }
      })
  })
})

// -------------Extraer los archivos y ponerlos en un array--------
describe('searchLinks', () => {
  it('should return an array of links inside the markdown file', async () => {
    const content = await fileRead('.\\Pruebas\\README2.md');
    expect(searchLinks('.\\Pruebas\\README2.md', content)).toEqual([
      {
        href: 'https://regexr.com/',
        text: 'Markdown',
        file: '.\\Pruebas\\README2.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html',
        text: 'Node',
        file: '.\\Pruebas\\README2.md'
      },
      {
        href: 'https://nodejs.org/api/fs.html/noexiste',
        text: 'Node no existe',
        file: '.\\Pruebas\\README2.md'
      }
    ]);
  });
});

// // -------------Array con los links para validar --------

// const linkArray = [
//   {
//     href: 'https://regexr.com/',
//     text: 'Markdown',
//     file: 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas\\README2.md',
//     status: 200,
//     ok: 'ok',
//   },
//   {
//     href: 'https://nodejs.org/api/fs.html',
//     text: 'Node',
//     file: 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas\\README2.md',
//     status: 200,
//     ok: 'ok',
//   },
//   {
//     href: 'https://nodejs.org/api/fs.html/noexiste',
//     text: 'Node no existe',
//     file: 'C:\\Users\\ANDREA\\OneDrive\\Desktop\\Laboratoria\\DEV003-md-links\\Pruebas\\README2.md',
//     status: 404,
//     ok: 'fail',
//   },
// ]

// // -------------------- Mock  1 fetch --------
// global.fetch = jest.fn(() => {
//   return Promise.resolve({ status: 200, ok: 'ok' })
// })

// // --------------------  getStatusLinks ------------
// describe('statusLink', () => {
//   it('should return statusLink.', async () => {
//     const path = '.\\Pruebas\\README2.md'
//     const data = await statusLink(path)
//     expect(data).toEqual(
//       linkArray
//       //
//     )
//   })
// })
