const { pathExists, isAbsolute, toAbsolute, isFile, isDirectory, isMD, readDoc, getLinks, getStatus, readDir, } = require('../src/api.js');

const route = 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba.md';
const dir = 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links';

describe('path exists?', () => {

    it('should be a function', () => {
        expect(typeof pathExists).toBe('function');
    });

    it('should return true', () => {
        expect(pathExists('README.md')).toBeTruthy();
    });
});

describe('is absolute path?', () => {

    it('should be a function', () => {
        expect(typeof isAbsolute).toBe('function');
    });

    it('should return true if the path is absolute', () => {
        expect(isAbsolute('README.md')).toBeFalsy();
    });
});

describe('convert path to absolute', () => {

    it('should be a function', () => {
        expect(typeof toAbsolute).toBe('function');
    });

    it('should return absolute path', () => {
        expect(toAbsolute('README.md')).toBe('C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\README.md');
    });
});

describe('is file?', () => {

    it('should be a function', () => {
        expect(typeof isFile).toBe('function');
    });

    it('should return true if path is a file', () => {
        expect(isFile('README.md')).toBeTruthy();
    });
});

describe('is MD?', () => {

    it('should be a function', () => {
        expect(typeof isMD).toBe('function');
    });

    it('should return true if file is md', () => {
        expect(isMD('README.md')).toBeTruthy();
    });
    it('should return false if file is not md', () => {
        expect(isMD('README.txt')).toBeFalsy();
    });
});

describe('read file', () => {

    const file = 'Texto de prueba\n' +
        '[Markdown](https://es.wikipedia.org/wiki/Markdown) \n' +
        '[Google](http://google.com/)'

    it('should be a function', () => {
        expect(typeof readDoc).toBe('function');
    });

    // test('data', () => {
    //     return expect(readDoc('prueba.md')).resolves.toBe(file);
    // });

    test('the promise es rejeted', () => {
        return expect(readDoc('READE.md')).rejects.toMatch('error');
    });

});

describe('get links', () => {

    const data = '[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado [Github](https://github.com/kenruizinoue/tt-node-fetch-ejemplo/blob/app.js)';
    const arrayLinks = [
        {
            href: 'https://es.wikipedia.org/wiki/Markdown',
            text: 'Markdown',
            file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba.md'
        },
        {
            href: 'https://github.com/kenruizinoue/tt-node-fetch-ejemplo/blob/app.js',
            text: 'Github',
            file: 'C:\\Users\\vanne\\Laboratoria\\DEV003-md-links\\prueba.md'
        },
    ]
    const dataNoLinks = 'Markdown es un lenguaje de marcado';

    it('should be a function', () => {
        expect(typeof getLinks).toBe('function');
    });

    it('should return an array', () => {
        expect(getLinks(data, route)).toEqual(arrayLinks);
    });

    it('should return an message', () => {
        expect(getLinks(dataNoLinks, route)).toEqual([]);
    });

});

// describe('read directory', () => {

//     const array = [
//         ".editorconfig",
//         ".eslintrc",
//         ".git",
//         ".gitignore",
//         ".vscode",
//         "coverage",
//         "file.txt",
//         "index.js",
//         "node_modules",
//         "package-lock.json",
//         "package.json",
//         "prueba",
//         "prueba.md",
//         "README.md",
//         "src",
//         "test",
//         "thumb.png",
//     ]

//     it('should be a function', () => {
//         expect(typeof readDir).toBe('function');
//     });

//     it('should return an array', () => {
//         expect(readDir(dir)).toEqual(array);
//     });

// });