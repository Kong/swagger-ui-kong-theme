import React, {useEffect} from 'react';
import SwaggerUI from 'swagger-ui';
import SwaggerParser from 'swagger-parser'
import YAML from 'yaml-js'
import 'swagger-ui/dist/swagger-ui.css';
import {SwaggerUIKongTheme} from 'swagger-ui-kong-theme'

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

const SwaggerLoader = (props) => {
    useEffect(() => {
        const {match: {params: {specUrl, config}}} = props;

        const parseSpec = (contents) => {
            let parsedSpec //set empty var to hold spec
            let errorArray = [];

            try {
                //parse spec as JSON
                //if failed push json error msg into error array
                parsedSpec = JSON.parse(contents);
            } catch (jsonError) {
                const errorMsg = (libraryMsg) => `Error trying to parse ${libraryMsg}:<br>`;
                errorArray.push(errorMsg('JSON'), jsonError)
                //    try to parse as YAML
                try {
                    parsedSpec = YAML.load(contents);
                } catch (yamlError) {
                    errorArray.push(errorMsg('YAML'), yamlError)
                }
            }
            SwaggerParser.validate(parsedSpec, (err) => {
                return err && console.error(err);
            });

            return parsedSpec ? parsedSpec : errorArray;
        };

        const loadSpec = async (url) => {
            try {
                return parseSpec(await (await fetch(url)).text())
            } catch (e) {
                return e
            }
        };

        const loadUrlConfig = async (specUrl, config) => {
            if (specUrl) {
                const url = decodeURIComponent(specUrl);
                if (config) {
                    swaggerUIOptions = {
                        ...swaggerUIOptions,
                        ...JSON.parse(decodeURIComponent(config))
                    }
                }
                swaggerUIOptions.spec = await loadSpec(url);
                return swaggerUIOptions;
            } else {
                console.log('failed to load');
            }
        };

        loadUrlConfig(specUrl, config).then(options => {
            if (options) {
                console.log("-> options", options);
                SwaggerUI(options);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id="ui-wrapper"/>;
}

export default SwaggerLoader;
