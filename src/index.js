const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const yaml = require('js-yaml')
const config = require('./config')
const { quote, unquote } = require('./utils')

class YamlThemer {
  colorRegex = Object.keys(config.colors)
    |> #.map((name) => `":"(${name})`)
    |> #.join('|')
    |> new RegExp(#, 'g')

  clearOutputDir = () => {
    rimraf.sync(config.outputPath)
    fs.mkdirSync(config.outputPath)
  }

  colorRegexReplace = (match) =>
    match
    |> unquote
    |> (_ => config.colors[#])()
    |> quote

  replaceColors = (data) =>
    data.replace(this.colorRegex, this.colorRegexReplace)

  readFile = (file) =>
    file
    |> path.join(config.inputPath, #)
    |> fs.readFileSync(#, 'utf8')
    |> yaml.load
    |> JSON.stringify

  saveFile = (file, data) =>
    file
    |> #.replace(/\.yaml/, '.json')
    |> path.join(config.outputPath, #)
    |> fs.writeFileSync(#, data)

  init = () => {
    this.clearOutputDir()
    fs.readdirSync(config.inputPath).forEach((file) => {
      file
      |> this.readFile(#)
      |> this.replaceColors(#)
      |> this.saveFile(file, #)
    })
  }
}

const yamlThemer = new YamlThemer
yamlThemer.init()
