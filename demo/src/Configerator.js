import React from 'react';
import { Link } from "react-router-dom";
import syles from './Configerator.modules.css'

class Configerator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swaggerUrl: "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml",
      config:
`{
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
}`
    }
    this.handleChangeSwaggerUrl = this.handleChangeSwaggerUrl.bind(this)
    this.handleChangeConfig = this.handleChangeConfig.bind(this)
  }

  handleChangeSwaggerUrl(event) {
    this.setState({swaggerUrl: event.target.value});
  }

  handleChangeConfig(event){
    this.setState({config: event.target.value});
  }

  createLink(url) {
    return `swagger/${encodeURIComponent(process.env.PUBLIC_URL + url)}/${encodeURIComponent(this.state.config)}`
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Swagger UI Kong Theme demo</h1>
        <p>From here you can try different spec files and configurations.</p>

        <textarea className='config-editor' type="text" value={this.state.config} onChange={this.handleChangeConfig}>

        </textarea>

        <ul>
          <li>
            <Link to={this.createLink("/specs/httpbin.yaml")}>httpbin.yaml</Link>
          </li>
          <li>
            <Link to={"swagger/" + encodeURIComponent(process.env.PUBLIC_URL + "/specs/petstore.json")}>petstore.json</Link>
          </li>
          <li>
            <Link to={"swagger/" + encodeURIComponent(process.env.PUBLIC_URL + "/specs/uber.json")}>uber.json</Link>
          </li>
          <li>
            <input type="text" value={this.state.swaggerUrl} onChange={this.handleChangeSwaggerUrl} />

            <Link to={"swagger/" + encodeURIComponent(process.env.PUBLIC_URL + this.state.swaggerUrl)}>Your Url</Link>
          </li>

        </ul>


      </div>
    );
  }
}



export default Configerator;
