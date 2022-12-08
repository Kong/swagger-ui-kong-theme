import React from "react"
import { escapeDeepLinkPath } from "../helpers/helpers"

// Loosely based on https://github.com/swagger-api/swagger-ui/blob/master/src/core/components/operation.jsx
export default class AugmentingOperation extends React.Component {
  render() {
    let { response, operation } = this.props
    const { tag, operationId } = operation.toJS()

    let op = operation.getIn(["op"])
    let responses = operation.get("responses")
    let isShownKey = ["operations", tag, operationId]
    let id = escapeDeepLinkPath(isShownKey.join("-"))

    if(responses && response && response.size > 0) {
      let notDocumented = !responses.get(String(response.get("status"))) && !responses.get("default")
      response = response.set("notDocumented", notDocumented)
    }

    // TODO: fix me
    const $exampleResponse = window.document.querySelector(`#${id} .responses-table:not(.live-responses-table)` )

    if (response && $exampleResponse) {
      $exampleResponse.style.display = 'none'

    } else if ($exampleResponse) {
      $exampleResponse.style.display = 'table'
    }

    return null
  }
}
