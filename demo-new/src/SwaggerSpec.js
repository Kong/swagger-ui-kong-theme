import {useState} from 'react';
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';
import SwaggerParser from 'swagger-parser'
import SwaggerUIKongTheme from 'swagger-ui-kong-theme/dist/bundle';
import {useParams, useNavigate} from 'react-router-dom';
import YAML from 'yaml-js'
import {Route as ROUTE} from './routes';

const SwaggerSpec = () => {

    //parse url
    const navigate = useNavigate();
    const {specUrl, config} = useParams();

    //initial config
    let uiSpecConfig = SwaggerUI({
        url: "https://petstore.swagger.io/v2/swagger.json",
        deepLinking: true,
        filter: true,
        presets: [
            SwaggerUI.presets.apis,
        ],
        plugins: [
            SwaggerUIKongTheme.SwaggerUIKongTheme,
            SwaggerUI.plugins.DownloadUrl,
        ],
        layout: 'KongLayout'
    });

    //error
    const [hasError, setHasError] = useState(false);
    //effects

    const loadSwaggerUI = async () => {
        if (hasError) {
            setHasError(false)
        }

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
                return parseSpec(await (await fetch(`${window.location.origin}/${url}`
                )).text())
            } catch (e) {
                setHasError(true);
                console.log(`error: ${e}`);
            }
        };

        const loadUrlConfig = async (specUrl, config) => {
            if (specUrl) {
                const url = decodeURIComponent(specUrl);
                if (config) {
                    let uiSpecConfig = {
                        // eslint-disable-next-line no-use-before-define
                        ...uiSpecConfig,
                        ...JSON.parse(decodeURIComponent(config))
                    }
                }
                try {
                    uiSpecConfig.spec = await loadSpec(url);
                    return uiSpecConfig;
                } catch (e) {
                    console.log(`error: ${e}`);
                    setHasError(true);
                }
            } else {
                throw new Error('Failed to load');
            }
        };
        try {
            const options = await loadUrlConfig(specUrl, config);
            if (options) {
                SwaggerUI(options);
            }
        } catch (e) {
            setHasError(true);
        }
    }


    return (
        <div>
            <div className='btn-panel'>
                <button onClick={() => {
                    navigate(ROUTE.HOME)
                }}>Back
                </button>
            </div>
            <div className='btn-panel'>
                {hasError && <button onClick={loadSwaggerUI}>Try Again</button>}
            </div>
            <div id="ui-wrapper"/>
        </div>
    )
};

export default SwaggerSpec;
