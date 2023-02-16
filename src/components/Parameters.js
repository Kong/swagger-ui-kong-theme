/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/parameters/parameters.jsx
 * @prettier
 */

import React, { Component } from "react"
import Im, { Map, List } from "immutable"

// More readable, just iterate over maps, only
const eachMap = (iterable, fn) => iterable.valueSeq().filter(Im.Map.isMap).map(fn)

export default class Parameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      callbackVisible: false,
      parametersVisible: true
    }
  }


  static defaultProps = {
    onTryoutClick: Function.prototype,
    onCancelClick: Function.prototype,
    tryItOutEnabled: false,
    allowTryItOut: true,
    onChangeKey: [],
    specPath: [],
  }

  onChange = (param, value, isXml) => {
    let {
      specActions: { changeParamByIdentity },
      onChangeKey,
    } = this.props

    changeParamByIdentity(onChangeKey, param, value, isXml)
  }

  onChangeConsumesWrapper = (val) => {
    let {
      specActions: { changeConsumesValue },
      onChangeKey
    } = this.props

    changeConsumesValue(onChangeKey, val)
  }

  toggleTab = (tab) => {
    if (tab === "parameters") {
      return this.setState({
        parametersVisible: true,
        callbackVisible: false
      })
    } else if (tab === "callbacks") {
      return this.setState({
        callbackVisible: true,
        parametersVisible: false
      })
    }
  }

  render() {

    let {
      onTryoutClick,
      onCancelClick,
      parameters,
      allowTryItOut,
      tryItOutEnabled,
      specPath,

      fn,
      getComponent,
      getConfigs,
      specSelectors,
      specActions,
      pathMethod,
      oas3Actions,
      oas3Selectors,
      operation
    } = this.props

    const ParameterRow = getComponent("parameterRow")
    const TryItOutButton = getComponent("TryItOutButton")
    const ContentType = getComponent("contentType")
    const Callbacks = getComponent("Callbacks", true)
    const RequestBody = getComponent("RequestBody", true)

    const isExecute = tryItOutEnabled && allowTryItOut
    const isOAS3 = specSelectors.isOAS3()

    const requestBody = operation.get("requestBody")
    return (
      <section className="opblock-section">
        <div className="opblock-section-header">
          {isOAS3 ? (
            <div className="tab-header">
              <div onClick={() => this.toggleTab("parameters")} className={`tab-item ${this.state.parametersVisible && "active"}`}>
                <h3 className="opblock-title"><span>Parameters</span></h3>
              </div>
              {operation.get("callbacks") ?
                (
                  <div onClick={() => this.toggleTab("callbacks")} className={`tab-item ${this.state.callbackVisible && "active"}`}>
                    <h3 className="opblock-title"><span>Callbacks</span></h3>
                  </div>
                ) : null
              }
            </div>
          ) : (
            <div className="tab-header">
              <h3 className="opblock-title">Parameters</h3>
            </div>
          )}
          {allowTryItOut ? (
            <TryItOutButton enabled={tryItOutEnabled} onCancelClick={onCancelClick} onTryoutClick={onTryoutClick} />
          ) : null}
        </div>
        {this.state.parametersVisible ? <div className="parameters-container">
          {!parameters.count() ? <div className="opblock-description-wrapper"><p>No parameters</p></div> :
            <div className="table-container">
              <table className="parameters">
                <thead>
                  <tr>
                    <th className="col_header parameters-col_name" scope="col">Name</th>
                    <th className="col_header parameters-col_description" scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    eachMap(parameters, (parameter, i) => (
                      <ParameterRow
                        fn={fn}
                        specPath={specPath.push(i.toString())}
                        getComponent={getComponent}
                        getConfigs={getConfigs}
                        rawParam={parameter}
                        param={specSelectors.parameterWithMetaByIdentity(pathMethod, parameter)}
                        key={`${parameter.get("in")}.${parameter.get("name")}`}
                        onChange={this.onChange}
                        onChangeConsumes={this.onChangeConsumesWrapper}
                        specSelectors={specSelectors}
                        specActions={specActions}
                        oas3Actions={oas3Actions}
                        oas3Selectors={oas3Selectors}
                        pathMethod={pathMethod}
                        isExecute={isExecute} />
                    )).toArray()
                  }
                </tbody>
              </table>
            </div>
          }
        </div> : null}

        {this.state.callbackVisible ? <div className="callbacks-container opblock-description-wrapper">
          <Callbacks
            callbacks={Map(operation.get("callbacks"))}
            specPath={specPath.slice(0, -1).push("callbacks")}
          />
        </div> : null}
        {
          isOAS3 && requestBody && this.state.parametersVisible &&
          <div className="opblock-section opblock-section-request-body">
            <div className="opblock-section-header">
              <h3 className={`opblock-title parameter__name ${requestBody.get("required") && "required"}`}>Request body</h3>
              <label>
                <ContentType
                  value={oas3Selectors.requestContentType(...pathMethod)}
                  contentTypes={requestBody.get("content", List()).keySeq()}
                  onChange={(value) => {
                    oas3Actions.setRequestContentType({ value, pathMethod })
                  }}
                  className="body-param-content-type" />
              </label>
            </div>
            <div className="opblock-description-wrapper">
              <RequestBody
                specPath={specPath.slice(0, -1).push("requestBody")}
                requestBody={requestBody}
                requestBodyValue={oas3Selectors.requestBodyValue(...pathMethod)}
                requestBodyInclusionSetting={oas3Selectors.requestBodyInclusionSetting(...pathMethod)}
                isExecute={isExecute}
                activeExamplesKey={oas3Selectors.activeExamplesMember(
                  ...pathMethod,
                  "requestBody",
                  "requestBody" // RBs are currently not stored per-mediaType
                )}
                updateActiveExamplesKey={key => {
                  this.props.oas3Actions.setActiveExamplesMember({
                    name: key,
                    pathMethod: this.props.pathMethod,
                    contextType: "requestBody",
                    contextName: "requestBody" // RBs are currently not stored per-mediaType
                  })
                }
                }
                onChange={(value, path) => {
                  if (path) {
                    const lastValue = oas3Selectors.requestBodyValue(...pathMethod)
                    const usableValue = Map.isMap(lastValue) ? lastValue : Map()
                    return oas3Actions.setRequestBodyValue({
                      pathMethod,
                      value: usableValue.setIn(path, value)
                    })
                  }
                  oas3Actions.setRequestBodyValue({ value, pathMethod })
                }}
                onChangeIncludeEmpty={(name, value) => {
                  oas3Actions.setRequestBodyInclusion({
                    pathMethod,
                    value,
                    name,
                  })
                }}
                contentType={oas3Selectors.requestContentType(...pathMethod)} />
            </div>
          </div>
        }
      </section>
    )
  }
}
