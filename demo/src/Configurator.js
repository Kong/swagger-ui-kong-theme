import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './Configurator.css';

const Configurator = () => {
    const [swaggerUrl, setSwaggerUrl] = useState("https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore-expanded.yaml");
    const [config, setConfig] = useState(`{
  "dom_id":"#ui-wrapper",
  "docExpansion":"list",
  "deepLinking":true,
  "filter":true,
  "layout":"KongLayout",
  "theme": {
    "swaggerAbsoluteTop": "0px",
    "hasSidebar": true,
    "languages" : [
      {
        "prismLanguage":"bash",
        "target":"shell",
        "client":"curl"
      },{
        "prismLanguage":"javascript",
        "target":"javascript",
        "client":"xhr"
      },{
        "prismLanguage":"python",
        "target":"python"
      },{
        "prismLanguage":"ruby",
        "target":"ruby"
    }]
  }
}`);

    const handleChangeSwaggerUrl = ({target: {value}}) => {
        setSwaggerUrl(value);
    }

    const handleChangeConfig= ({target: {value}}) => {
        setConfig(value);
    }

    const createLink  = (url) => {
        return `swagger/${encodeURIComponent(url)}/${encodeURIComponent(config)}`
    }

    return (
        <div>
            <h1>Welcome to the Swagger UI Kong Theme demo</h1>
            <p>From here you can try different spec files and configurations.</p>

            <textarea className='config-editor' value={config} onChange={handleChangeConfig}/>

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
                    <input type="text" value={swaggerUrl} onChange={handleChangeSwaggerUrl} />

                    <Link to={createLink(swaggerUrl)}>Your Url</Link>
                </li>
            </ul>
        </div>
    );
}

export default Configurator;
