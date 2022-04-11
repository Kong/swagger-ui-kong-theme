/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/model-example.jsx
 * @prettier
 */

import React from "react"

export default class ModelExample extends React.Component {
  constructor(props, context) {
    super(props, context)
    let { getConfigs, isExecute } = this.props
    let { defaultModelRendering } = getConfigs()

    let activeTab = defaultModelRendering

    if (defaultModelRendering !== "example" && defaultModelRendering !== "model") {
      activeTab = "example"
    }

    if(isExecute) {
      activeTab = "example"
    }

    this.state = {
      activeTab: activeTab
    }
  }

  activeTab =( e ) => {
    let { target : { dataset : { name } } } = e

    this.setState({
      activeTab: name
    })
  }

  handleKeypress = (event) => {
    if (event.nativeEvent.code === "Enter" || event.nativeEvent.code === "Space") {
      this.activeTab(event)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isExecute &&
      !this.props.isExecute &&
      this.props.example
    ) {
      this.setState({ activeTab: "example" })
    }
  }

  render() {
    let { getComponent, specSelectors, schema, example, isExecute, getConfigs, specPath } = this.props
    let { defaultModelExpandDepth } = getConfigs()
    const ModelWrapper = getComponent("ModelWrapper")
    const HighlightCode = getComponent("highlightCode")

    let isOAS3 = specSelectors.isOAS3()

    return <div className="model-example">
      <ul className="tab">
        <li className={ "tabitem" + ( this.state.activeTab === "example" ? " active" : "") }>
          <a
            role="button"
            tabIndex={0}
            aria-label={isExecute ? "Anchor tag to open edit value" : "Anchor tag to display example value"}
            onKeyUp={(e) => this.handleKeypress(e)}
            className="tablinks"
            data-name="example"
            onClick={ this.activeTab }
          >
            {isExecute ? "Edit Value" : "Example Value"}
          </a>
        </li>
        { schema ? <li className={ "tabitem" + ( this.state.activeTab === "model" ? " active" : "") }>
          <a
            role="button"
            tabIndex={0}
            aria-label={isOAS3 ? "Anchor tag to show schema" : "Anchor tag to show model" }
            onKeyUp={(e) => this.handleKeypress(e)}
            className={ "tablinks" + ( isExecute ? " inactive" : "" )}
            data-name="model"
            onClick={ this.activeTab }
          >
            {isOAS3 ? "Schema" : "Model" }
          </a>
        </li> : null }
      </ul>
      <div>
        {
          this.state.activeTab === "example" ? (
            example ? example : (
              <HighlightCode value="(no example available)" />
            )
          ) : null
        }
        {
          this.state.activeTab === "model" && (
            <ModelWrapper schema={ schema }
              getComponent={ getComponent }
              getConfigs={ getConfigs }
              specSelectors={ specSelectors }
              expandDepth={ defaultModelExpandDepth }
              specPath={specPath} />
          )
        }
      </div>
    </div>
  }

}
