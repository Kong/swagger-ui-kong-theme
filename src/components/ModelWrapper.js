/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/model-wrapper.jsx
 * @prettier
 */


import React, { Component, } from "react"

export default class ModelWrapper extends Component {
  onToggle = (name,isShown) => {
    // If this prop is present, we'll have deepLinking for it
    if(this.props.layoutActions) {
      this.props.layoutActions.show(["models", name],isShown)
    }
  }

  render(){
    let { getComponent, getConfigs } = this.props
    const Model = getComponent("Model")

    let expanded
    if (this.props.layoutSelectors) {
      // If this is prop is present, we'll have deepLinking for it
      expanded = this.props.layoutSelectors.isShown(["models",this.props.name])
    }

    return (
      <div className="model-box" tabIndex={0}>
        <Model
          { ...this.props }
          getConfigs={ getConfigs }
          expanded={expanded}
          depth={ 1 }
          onToggle={ this.onToggle }
          expandDepth={ this.props.expandDepth || 0 }
        />
      </div>
    )
  }
}
