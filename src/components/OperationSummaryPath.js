import React, { PureComponent } from "react"
import { createDeepLinkPath } from "../helpers/helpers"

export default class OperationSummaryPath extends PureComponent{
  onCopyCapture = (e) => {
    // strips injected zero-width spaces (`\u200b`) from copied content
    e.clipboardData.setData("text/plain", this.props.operationProps.get("path"))
    e.preventDefault()
  }

  render(){
    let {
      getComponent,
      operationProps,
    } = this.props


    let {
      deprecated,
      isShown,
      path,
      tag,
      operationId,
      isDeepLinkingEnabled,
    } = operationProps.toJS()

    const DeepLink = getComponent( "DeepLink" )

    return(
      <span
        className={ deprecated ? "opblock-summary-path__deprecated" : "opblock-summary-path" } 
        onCopyCapture={this.onCopyCapture}
        data-path={path}
      >
        <DeepLink
          enabled={isDeepLinkingEnabled}
          isShown={isShown}
          showArrow={true}
          path={createDeepLinkPath(`${tag}/${operationId}`)}
          text={path.replace(/\//g, "\u200b/")} 
        />
      </span>

    )
  }
}
