/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/responses.jsx
 * @prettier
 */

import React from "react"
import { fromJS } from "immutable"
import { defaultStatusCode, getAcceptControllingResponse } from '../helpers/helpers'

export default class Responses extends React.Component {
  static defaultProps = {
    tryItOutResponse: null,
    produces: fromJS(["application/json"]),
    displayRequestDuration: false
  }

  onChangeProducesWrapper = (val) => this.props.specActions.changeProducesValue([this.props.path, this.props.method], val)

  onResponseContentTypeChange = ({ controlsAcceptHeader, value }) => {
    const { oas3Actions, path, method } = this.props
    if (controlsAcceptHeader) {
      oas3Actions.setResponseContentType({
        value,
        path,
        method
      })
    }
  }

  render() {
    let {
      responses,
      tryItOutResponse,
      getComponent,
      getConfigs,
      specSelectors,
      fn,
      producesValue,
      displayRequestDuration,
      specPath,
      path,
      method,
      oas3Selectors,
      oas3Actions,
    } = this.props
    let defaultCode = defaultStatusCode(responses)

    const ContentType = getComponent("contentType")
    const LiveResponse = getComponent("liveResponse")
    const Response = getComponent("response")

    let produces = this.props.produces && this.props.produces.size ? this.props.produces : Responses.defaultProps.produces

    const isSpecOAS3 = specSelectors.isOAS3()

    const acceptControllingResponse = isSpecOAS3 ?
      getAcceptControllingResponse(responses) : null

    return (
      <div className="responses-wrapper">
        <div className="opblock-section-header">
          <h3>Responses</h3>
          {specSelectors.isOAS3() ? null : <label>
            <span>Response content type</span>
            <ContentType value={producesValue}
              onChange={this.onChangeProducesWrapper}
              contentTypes={produces}
              className="execute-content-type" />
          </label>}
        </div>
        <div className="responses-inner">
          {
            !tryItOutResponse ? null
              : <div>
                <LiveResponse response={tryItOutResponse}
                  getComponent={getComponent}
                  getConfigs={getConfigs}
                  specSelectors={specSelectors}
                  path={this.props.path}
                  method={this.props.method}
                  displayRequestDuration={displayRequestDuration} />
                <h3>Responses</h3>
              </div>

          }

          <table className="responses-table">
            <thead>
              <tr className="responses-header">
                <td className="col_header response-col_status">Code</td>
                <td className="col_header response-col_description">Description</td>
                {specSelectors.isOAS3() ? <td className="col col_header response-col_links">Links</td> : null}
              </tr>
            </thead>
            <tbody>
              {
                responses.entrySeq().map(([code, response]) => {

                  let className = tryItOutResponse && tryItOutResponse.get("status") == code ? "response_current" : ""
                  return (
                    <Response key={code}
                      path={path}
                      method={method}
                      specPath={specPath.push(code)}
                      isDefault={defaultCode === code}
                      fn={fn}
                      className={className}
                      code={code}
                      response={response}
                      specSelectors={specSelectors}
                      controlsAcceptHeader={response === acceptControllingResponse}
                      onContentTypeChange={this.onResponseContentTypeChange}
                      contentType={producesValue}
                      getConfigs={getConfigs}
                      activeExamplesKey={oas3Selectors.activeExamplesMember(
                        path,
                        method,
                        "responses",
                        code
                      )}
                      oas3Actions={oas3Actions}
                      getComponent={getComponent} />
                  )
                }).toArray()
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
