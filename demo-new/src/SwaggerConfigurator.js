import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './SwaggerConfigurator.css';

const SwaggerConfigurator = () => {
    //initial settings
    const DEFAULT_URL = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml';
    const DEFAULT_CONFIG = `{
        "dom_id": "#ui-wrapper",
        "docExpansion": "list",
        "deepLinking": true,
        "filter": true,
        "layout": "KongLayout",
        "theme": {
            "swaggerAbsoluteTop": "0px",
            "hasSidebar": true,
            "languages": [
                {
                    "prismLanguage": "bash",
                    "target": "shell",
                    "client": "curl"
                }, {
                    "prismLanguage": "javascript",
                    "target": "javascript",
                    "client": "xhr"
                }, {
                    "prismLanguage": "python",
                    "target": "python"
                }, {
                    "prismLanguage": "ruby",
                    "target": "ruby"
                }]
        }
    }`;
    //    state
    const [swaggerUrl, setSwaggerUrl] = useState(DEFAULT_URL);
    const [swaggerConfig, setSwaggerConfig] = useState(DEFAULT_CONFIG);

    const handleUrlChange = ({target: {value}}) => {
        setSwaggerUrl(value);
    }

    const handleConfigChange = ({target: {value}}) => {
        setSwaggerConfig(value);
    }

    const createLink = (url) => {
        return `swagger/${encodeURIComponent(url)}/${encodeURIComponent(swaggerConfig)}`
    }

    return (
        <div>
            <h1>Welcome to the Swagger UI Kong Theme demo</h1>
            <p>From here you can try different spec files and configurations.</p>

            <textarea className='config-editor' value={swaggerConfig} onChange={handleConfigChange}/>

            <ul>
                <li>
                    <Link to={createLink("/specs/httpbin.yaml")}>httpbin.yaml</Link>
                </li>
                <li>
                    <Link to={createLink("/specs/petstore.json")}>petstore.json</Link>
                </li>
                <li>
                    <Link to={createLink("/specs/uber.json")}>uber.json</Link>
                </li>
                <li>
                    <input type="text" value={swaggerUrl} onChange={handleUrlChange}/>

                    <Link to={createLink(swaggerUrl)}>Your Url</Link>
                </li>
            </ul>
        </div>
    );
}

export default SwaggerConfigurator;
