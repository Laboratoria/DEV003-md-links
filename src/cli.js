#!/usr/bin/env node

const { mdLinks } = require('./mdLinks');
const option = require('./options');

//console.log(process.argv);
const args = process.argv;
const path = process.argv[2];
const colors = require('colors/safe')

function cli() {

    const validate = args.includes('--validate') || args.includes('-v');
    const stats = args.includes('--stats') || args.includes('-s');
    const help = args.includes('--help') || args.includes('-h');

    if (!path || help) {
        console.log(colors.brightCyan('\n------------------------------------------------- MD-LINKS -------------------------------------------------'));
        console.log(colors.brightMagenta('Enter a path and an option. Available options: '));
        console.log(colors.magenta('--validate or -v: ') + 'Return the status of the links');
        console.log(colors.magenta('--state or -s: ') + 'Return total and unique links.');
        console.log(colors.magenta('--validate --state : ') + 'Return total,unique and broken links.');
        console.log(colors.brightCyan('--------------------------------------------------------------------------------------------------------------'));
        process.exit(0);
    }
    //se ingresa solo el path
    else if (!validate && !stats) {
        mdLinks(path, { validate: false }).then((arrObjects) => {
            for (let i = 0; i < arrObjects.length; i++) {
                console.log(colors.brightCyan('--------------------------------------------------------------------------------------------------------------'));
                console.log(colors.brightMagenta.bold('href:', arrObjects[i].href));
                console.log('text:', arrObjects[i].text);
                console.log('file:', arrObjects[i].file);
            }
            process.exit(0);
        })
            .catch(console.error)
    }
    else if (validate && !stats) {
        mdLinks(path, { validate: true }).then((arrObjects) => {
            for (let i = 0; i < arrObjects.length; i++) {
                console.log(colors.brightCyan('--------------------------------------------------------------------------------------------------------------'));
                console.log(colors.brightMagenta.bold('href:', arrObjects[i].href));
                console.log('text:', arrObjects[i].text);
                console.log('file:', arrObjects[i].file);
                console.log('status:', colors.white(arrObjects[i].status));
                console.log('message:', arrObjects[i].statusText);
            }
            process.exit(0);
        })
            .catch(console.error)
    }

    else if (stats) {
        mdLinks(path, { validate: true }).then((arrObjects) => {
            const totalLinks = option.totalLinks(arrObjects);
            const uniqueLinks = option.uniqueLinks(arrObjects);
            console.log(colors.magenta(totalLinks));
            console.log(colors.magenta(uniqueLinks));
            if (validate) {
                const brokenLinks = option.brokenLinks(arrObjects);
                console.log(colors.magenta(brokenLinks));
            }
            process.exit(0);
        })
            .catch(console.error)
    }
};

cli()
