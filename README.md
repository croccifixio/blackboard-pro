# Blackboard Pro Theme

This is Blackboard Pro. A dark theme for Visual Studio Code.

## Screenshots

![screenshot](https://raw.githubusercontent.com/Croccifixio/blackboard-pro/main/showcase/screenshot.png)

~~View it on the [tmTheme Editor](https://tmtheme-editor.herokuapp.com/#!/editor/url/https://raw.githubusercontent.com/croccifixio/blackboard-pro/main/showcase/blackboard-pro.tmTheme)~~ The tmTheme Editor app no longer seems to be working (see https://github.com/aziz/tmTheme-Editor/issues/275 for more details).

## Developing

This theme utilises a theme builder that is based on YAML. The theme builder can be initialised by running the following command:

```
npm run start
```

### Config Options

The `src/config.ts` file exports an object with the following attributes:

- #### colors
  `colors` is an object containing key-value pairs used for search and replace (i.e. any occurrences of the keys in the theme definition will be replaced with those keys' corresponding values). It is worth noting that this allows 8-digit hex codes to be used while only having to define the equivalent 6-digit hex code. An example is shown below.

  Given the following config:

  ```ts
  // src/config.ts
  // ...
    "colors": {
      "black": "#112233",
      "red": "#dd2244"
    },
  // ...
  ```

  And the following theme definition:

  ```yaml
  // my-theme.yaml
  // ...
  colors:
    editor.background: black
    editor.selectionBackground: red77
  ```

  The generated JSON file will have the following content:

  ```json
  // my-theme.json
  // ...
    "colors": {
      "editor.background": "#112233",
      "editor.selectionBackground": "#dd224477"
    }
  // ...
  ```

  Notice that the last 2 digits in the 8-digit hex code are preserved.

- #### inputPath
  `inputPath` is a path to the input folder containing the YAML files used for theming.
- #### outputPath
  `outputPath` is a path to the output folder that serves as the destination for generated JSON files. (__NOTE__: the output path must also be defined in the `contributes.themes.path` attribute of the `package.json`).

## Building

The theme can be built by running the following command:

```
npm run build
```

The built theme can be imported into VS Code by copying the `package.json` and the output folder that contains the generated JSON files, into VS Code's extensions folder.
