import React from 'react';
import SwaggerUI from 'swagger-ui'
import SwaggerParser from 'swagger-parser'
import YAML from 'yaml-js'
import 'swagger-ui/dist/swagger-ui.css';
import { SwaggerUIKongTheme } from 'swagger-ui-kong-theme'

async function loadSpec(url) {
  try {
    return parseSpec(await( await fetch(url) ).text())
  } catch(e) {
    return e
  }
}

function parseSpec (contents) {
  let parsedSpec // Set empty varible to hold spec
  let errorArray = [] // Set empty array to hold any errors

  // Try to parse spec as JSON
  // If parse fails push json error message into errors array
  try {
    parsedSpec = JSON.parse(contents)
  } catch (jsonError) {
    errorArray.push('Error trying to parse JSON:<br>' + jsonError)

    // Try to parse spec as YAML
    // If parse fails push yaml error message into errors array
    try {
      parsedSpec = YAML.load(contents)
    } catch (yamlError) {
      errorArray.push('Error trying to parse YAML:<br>' + yamlError)
    }
  }

  SwaggerParser.validate(parsedSpec, function (err, api) {
    if (err) {
      console.error(err)
    }
  })

  // If parsed is undefined return errors, else return the parsed spec file
  return parsedSpec === undefined ? errorArray : parsedSpec
}

let swaggerUIOptions = {

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
  async componentDidMount() {
    const { match: { params } } = this.props;
    if (params.specUrl) {
      const url = decodeURIComponent(params.specUrl)
      if (params.config) {
        // eslint-disable-next-line no-eval
        swaggerUIOptions = {
          ...swaggerUIOptions,
          ...JSON.parse(decodeURIComponent(params.config))
        }
      }
      swaggerUIOptions.spec = await loadSpec(url) // Define data to be used
      SwaggerUI(swaggerUIOptions)
    } else {
      console.log('failed to load')
    }

  }
  render() {
    return (
      <div id="ui-wrapper">
      </div>
    );
  }
}


export default SwaggerLoader;
