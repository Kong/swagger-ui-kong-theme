import React from 'react';
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';
import { SwaggerUIKongTheme } from 'swagger-ui-kong-theme'


const swaggerUIOptions = {
  url: "https://petstore.swagger.io/v2/swagger.json", // Define data to be used
  dom_id: '#ui-wrapper', // Determine what element to load swagger ui
  docExpansion: 'list',
  deepLinking: true, // Enables dynamic deep linking for tags and operations
  filter: true,
  presets: [
    SwaggerUI.presets.apis,
    SwaggerUI.SwaggerUIStandalonePreset
  ],
  plugins: [
    SwaggerUIKongTheme,
    SwaggerUI.plugins.DownloadUrl
  ],
  layout: 'KongLayout',
}


class SwaggerLoader extends React.Component{
  componentDidMount() {
    SwaggerUI(swaggerUIOptions)
  }
  render() {
    return (
      <div id="ui-wrapper">
      </div>
    );
  }
}


export default SwaggerLoader;
