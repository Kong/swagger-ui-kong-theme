import React from 'react'
import { escapeDeepLinkPath } from '../helpers/helpers'


export default class AugmentingOperation extends React.Component {


  render() {
    let {
      response,
    } = this.props
    let operationProps = this.props.operation

    let {
      tag,
      operationId
    } = operationProps.toJS()

    let operation = operationProps.getIn(["op"])
    let responses = operation.get("responses")
    let isShownKey = ["operations", tag, operationId]
    let id = escapeDeepLinkPath(isShownKey.join("-"))

    if(responses && response && response.size > 0) {
      let notDocumented = !responses.get(String(response.get("status"))) && !responses.get("default")
      response = response.set("notDocumented", notDocumented)
    }

    const $exampleResponse = window.document.querySelector(`#${id} .responses-table:not(.live-responses-table)` )

    if (response && $exampleResponse) {
      $exampleResponse.style.display = 'none'

    } else if ($exampleResponse) {
      $exampleResponse.style.display = 'inherit'
    }

    return (
      <div className='empty'>
      </div>
    )
  }
}
