This repo is a plugin for Swagger-UI that loads a custom 2/3 column theme, and adds code snippets with react-apiembed

This repo is still under development and changes are coming

## Known Issues
Swagger-UI does mot support react 16.
If you have react 16 ANYWHERE loaded/bundled on the same page as swagger you will not be able to fill in required perameters on try it
https://github.com/swagger-api/swagger-ui/issues/4745

Workaround: Use yarm not npm
make sure you have
```
  "resolutions": {
    "react": "15.6.2",
    "react-dom": "15.6.2"
  }
```
in your package json

## How to load

```
yarn add swagger-ui-kong-theme
```
From where you are loading your Swagger-Ui
```js
import { SwaggerUIKongTheme } from 'swagger-ui-kong-theme'
```
As part of the options include ```SwaggerUIKongTheme``` in the plugins array and ```'KongLayout'``` as your Layout

for example:
```js
const swaggerUIOptions = {
    spec: swaggerSpec, // Define data to be used
    dom_id: '#ui-wrapper', // Determine what element to load swagger ui
    docExpansion: 'list',
    deepLinking: true, // Enables dynamic deep linking for tags and operations
    filter: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIKongTheme,
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: 'KongLayout',
  }

  const ui = SwaggerUIBundle(swaggerUIOptions)
```


## How to develop
run to install required packages
``` yarn ```

run to build
``` npm run build ```


## Contributing
For problems directly related to this plugin, add an issue on GitHub.

For other issues, see Swagger UI
https://github.com/swagger-api/swagger-ui

