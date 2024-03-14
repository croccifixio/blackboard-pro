import { mkdirSync, readdirSync } from "node:fs";
import { sync as rimrafSync } from "rimraf";
import { load as loadYaml } from "js-yaml";
import { join, map, pipe } from "@fxts/core";

import { colors, inputPath, outputPath } from "./config";
import { prependPath, quote, readFile, unquote, writeFile } from "./utils";

class YamlThemer {
  colorRegex = pipe(
    colors,
    Object.keys,
    map((name) => `":"(${name})`),
    join("|"),
    (exp) => new RegExp(exp, "g")
  );

  clearOutputDir = () => {
    rimrafSync(outputPath);
    mkdirSync(outputPath);
  };

  colorRegexReplace = (match: string) =>
    pipe(
      match,
      unquote,
      (color) => colors[color as keyof typeof colors],
      quote
    );

  replaceColors = (data: string) =>
    data.replace(this.colorRegex, this.colorRegexReplace);

  readFile = (filename: string) =>
    pipe(
      filename,
      prependPath(inputPath),
      readFile,
      loadYaml,
      JSON.stringify
    );

  saveFile = (filename: string) => (data: string) =>
    pipe(
      filename.replace(/\.yaml/, ".json"),
      prependPath(outputPath),
      writeFile(data)
    );

  init = () => {
    this.clearOutputDir();
    readdirSync(inputPath).forEach((filename) => {
      pipe(
        filename,
        this.readFile,
        this.replaceColors,
        this.saveFile(filename)
      );
    });
  };
}

const yamlThemer = new YamlThemer();
yamlThemer.init();
