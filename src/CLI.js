#!/usr/bin/env node
const { mdLinks } = require('./API')
const Colors = require('colors')

//Estilo de los links

const linkStyle = array => {
  const style = array.map(
    link => ` \n 
 ${'HREF:'} ${link.href.cyan.bgBlack} 
 ${'TEXT:'} ${link.text.cyan}
 ${'FILE:'} ${link.file.cyan}
 `
  )
  return style
}
const linkStyleValidate = array => {
  const styleValidate = array.map(
    link => ` \n
 ${'HREF:'} ${link.href.cyan.bgBlack}
 ${'TEXT:'} ${link.text.cyan}
 ${'FILE:'} ${link.file.cyan}
 ${'STATUS:'} ${link.status}
 ${'OK:'} ${link.ok.cyan}
 `
  )
  return styleValidate
}

//Total 
const total = array => `Total: ${array.length}`

//Unique
const unique = array => {
  const unique = [...new Set(array.map(link => link.href))]
  return `Unique: ${unique.length}`
}

//Links rotos 
const brokenLinks = array => {
  const broken = array.filter(link => (link.ok = 'fail' && link.status >= 400))
  return `Broken: ${broken.length}`
}

const textHelp = () => {
  console.log(Colors.rainbow(' ------------- Welcome to MD-links' + '✌️' + '-------------'));
  console.log(Colors.cyan(`Do you need help ? 👀 ...Yo can use this commands:\n`))
  console.log(Colors.green.bgBlack('🟢 ' + 'validate (or --v)'            + '  ➡️  ' + '  Show an array with the links and their status \n'))
  console.log(Colors.blue.bgBlack('🔵 ' + 'stats (or --s)' + '  ➡️  ' + ' total & unique links \n '))
  console.log(Colors.yellow.bgBlack('🟡 ' + 'validate --stats (or --v --s)'  + '  ➡️  ' + '  total , unique & broken links \n'))
  console.log(Colors.cyan('🆘! ' + 'help (or --h) -->  Hi there! \n'))
}
const option = process.argv.slice(2)
const path = process.argv[2]

const validate = option.includes('--validate') || option.includes('--v')
const stats = option.includes('--stats') || option.includes('--s')
const help = option.includes('--help') || option.includes('--h')

mdLinks('.\\Pruebas\\README2.md', { validate })
  .then(resolve => {
    const links = resolve
    if (validate && stats) {
      console.log(`${total(links)}`.green)
      console.log(`${unique(links)}`.blue)
      console.log(`${brokenLinks(links)}`.red)
      process.exit(0)
    } else if (validate) {
      console.log(`${linkStyleValidate(links)}`)
      process.exit(0)
    } else if (stats) {
      console.log(`${total(links)}`.blue)
      console.log(`${unique(links)}`.blue)
    } else if (help) {
      console.log(textHelp())
    } else {
      console.log(
        'We show you the links that exist in the selected file, if you want to see its validation or statistics, place the following commands next to it: --validate or --stats or --validate --stats'
          .bold.yellow
      )
      console.log(`${linkStyle(links)}`)
    }
  })
  .catch(error => {
    console.log(error)
  })