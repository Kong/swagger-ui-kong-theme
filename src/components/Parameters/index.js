import React, { useState } from "react";
import PropTypes from "prop-types";
import { Map, List } from "immutable";
import ImPropTypes from "react-immutable-proptypes";

const Parameters = (props) => {
  const {
    parameters,
    operation,
    specActions,
    getComponent,
    specSelectors,
    oas3Actions,
    oas3Selectors,
    fn,
    tryItOutEnabled,
    allowTryItOut,
    onTryoutClick,
    onCancelClick,
    onChangeKey,
    pathMethod,
    getConfigs,
    specPath,
  } = props;

  const {
    changeParamByIdentity,
    changeConsumesValue,
    clearResponse,
    clearRequest,
    clearValidateParams,
  } = specActions;
  const { parameterWithMetaByIdentity, isOAS3 } = specSelectors;
  const {
    setRequestContentType,
    initRequestBodyValidateError,
    setRequestBodyValue,
    setRetainRequestBodyValueFlag,
    setActiveExamplesMember,
    setRequestBodyInclusion,
  } = oas3Actions;
  const {
    hasUserEditedBody,
    shouldRetainRequestBodyValue,
    requestBodyValue,
    requestBodyErrors,
    requestBodyInclusionSetting: requestBodyInclusionSettingFn,
    activeExamplesMember,
    requestContentType,
  } = oas3Selectors;

  const [callBackVisible, setCallBackVisible] = useState(false);
  const [parametersVisible, setParametersVisible] = useState(true);

  const onChange = (param, value, isXml) => {
    changeParamByIdentity(onChangeKey, param, value, isXml);
  };

  const onChangeConsumesWrapper = (val) => {
    changeConsumesValue(onChangeKey, val);
  };
  const toggleTab = (tab) => {
    if (tab === "parameters") {
      setParametersVisible(true);
      setCallBackVisible(false);
    }
    if (tab === "callbacks") {
      setCallBackVisible(true);
      setParametersVisible(false);
    }
  };

  const onChangeMediaType = ({ value, pathMethod }) => {
    const userHasEditedBody = hasUserEditedBody(...pathMethod);
    const shouldRetainRequestBodyVal = shouldRetainRequestBodyValue(
      ...pathMethod
    );
    setRequestContentType({ value, pathMethod });
    initRequestBodyValidateError({ pathMethod });
    if (!userHasEditedBody) {
      if (!shouldRetainRequestBodyVal) {
        setRequestBodyValue({ value: undefined, pathMethod });
      }
      clearResponse(...pathMethod);
      clearRequest(...pathMethod);
      clearValidateParams(pathMethod);
    }
  };

  const ParameterRow = getComponent("parameterRow");
  const TryItOutButton = getComponent("TryItOutButton");
  const ContentType = getComponent("contentType");
  const Callbacks = getComponent("Callbacks", true);
  const RequestBody = getComponent("RequestBody", true);
  const InfoAlert = getComponent("infoAlert");

  const isExecute = tryItOutEnabled && allowTryItOut;

  const requestBody = operation.get("requestBody");
  const groupedParametersArr = Object.values(
    parameters.reduce((acc, x) => {
      const key = x.get("in");
      acc[key] ??= [];
      acc[key].push(x);
      return acc;
    }, {})
  ).reduce((acc, x) => acc.concat(x), []);
  const retainRequestBodyValueFlagForOperation = (f) =>
    setRetainRequestBodyValueFlag({ value: f, pathMethod });

  return (
    <div className="opblock-section">
      <div className="opblock-section-header">
        {isOAS3() ? (
          <div className="tab-header">
            <div
              onClick={() => toggleTab("parameters")}
              className={`tab-item ${parametersVisible && "active"}`}
            >
              <h4 className="opblock-title">
                <span>Parameters</span>
              </h4>
            </div>
            {operation.get("callbacks") ? (
              <div
                onClick={() => toggleTab("callbacks")}
                className={`tab-item ${callBackVisible && "active"}`}
              >
                <h4 className="opblock-title">
                  <span>Callbacks</span>
                </h4>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="tab-header">
            <h4 className="opblock-title">Parameters</h4>
          </div>
        )}
        {allowTryItOut ? (
          <TryItOutButton
            isOAS3={isOAS3()}
            hasUserEditedBody={hasUserEditedBody(...pathMethod)}
            enabled={tryItOutEnabled}
            onCancelClick={onCancelClick}
            onTryoutClick={onTryoutClick}
            onResetClick={() =>
              setRequestBodyValue({ value: undefined, pathMethod })
            }
          />
        ) : null}
      </div>
      {parametersVisible ? (
        <div className="parameters-container">
          {!groupedParametersArr.length ? (
            <div className="opblock-description-wrapper">
              <InfoAlert msg="No parameters" />
            </div>
          ) : (
            <div className="table-container">
              <table className="parameters">
                <thead>
                  <tr>
                    <th className="col_header parameters-col_name">Name</th>
                    <th className="col_header parameters-col_description">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupedParametersArr.map((parameter, i) => {
                    return parameter.get("in") && parameter.get("name") ? (
                      <ParameterRow
                        fn={fn}
                        specPath={specPath.push(i.toString())}
                        getComponent={getComponent}
                        getConfigs={getConfigs}
                        rawParam={parameter}
                        param={parameterWithMetaByIdentity(
                          pathMethod,
                          parameter
                        )}
                        key={`${parameter.get("in")}.${parameter.get("name")}`}
                        onChange={onChange}
                        onChangeConsumes={onChangeConsumesWrapper}
                        specSelectors={specSelectors}
                        specActions={specActions}
                        oas3Actions={oas3Actions}
                        oas3Selectors={oas3Selectors}
                        pathMethod={pathMethod}
                        isExecute={isExecute}
                      />
                    ) : (
                      <InfoAlert msg="Parameter format is incorrect" />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}

      {callBackVisible ? (
        <div className="callbacks-container opblock-description-wrapper">
          <Callbacks
            callbacks={Map(operation.get("callbacks"))}
            specPath={specPath.slice(0, -1).push("callbacks")}
          />
        </div>
      ) : null}
      {isOAS3() && requestBody && parametersVisible && (
        <div className="opblock-section opblock-section-request-body">
          <div className="opblock-section-header">
            <h4
              className={`opblock-title parameter__name ${
                requestBody.get("required") && "required"
              }`}
            >
              Request body
            </h4>
            <label>
              <ContentType
                value={requestContentType(...pathMethod)}
                contentTypes={requestBody.get("content", List()).keySeq()}
                onChange={(value) => {
                  onChangeMediaType({ value, pathMethod });
                }}
                className="body-param-content-type"
                ariaLabel="Request content type"
              />
            </label>
          </div>
          <div className="opblock-description-wrapper">
            <RequestBody
              setRetainRequestBodyValueFlag={
                retainRequestBodyValueFlagForOperation
              }
              userHasEditedBody={hasUserEditedBody(...pathMethod)}
              specPath={specPath.slice(0, -1).push("requestBody")}
              requestBody={requestBody}
              requestBodyValue={requestBodyValue(...pathMethod)}
              requestBodyInclusionSetting={requestBodyInclusionSettingFn(
                ...pathMethod
              )}
              requestBodyErrors={requestBodyErrors(...pathMethod)}
              isExecute={isExecute}
              getConfigs={getConfigs}
              activeExamplesKey={activeExamplesMember(
                ...pathMethod,
                "requestBody",
                "requestBody" // RBs are currently not stored per-mediaType
              )}
              updateActiveExamplesKey={(key) => {
                setActiveExamplesMember({
                  name: key,
                  pathMethod,
                  contextType: "requestBody",
                  contextName: "requestBody", // RBs are currently not stored per-mediaType
                });
              }}
              onChange={(value, path) => {
                if (path) {
                  const lastValue = requestBodyValue(...pathMethod);
                  const usableValue = Map.isMap(lastValue) ? lastValue : Map();
                  return setRequestBodyValue({
                    pathMethod,
                    value: usableValue.setIn(path, value),
                  });
                }
                setRequestBodyValue({ value, pathMethod });
              }}
              onChangeIncludeEmpty={(name, value) => {
                setRequestBodyInclusion({
                  pathMethod,
                  value,
                  name,
                });
              }}
              contentType={requestContentType(...pathMethod)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Parameters.propTypes = {
  parameters: ImPropTypes.list.isRequired,
  operation: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  specSelectors: PropTypes.object.isRequired,
  oas3Actions: PropTypes.object.isRequired,
  oas3Selectors: PropTypes.object.isRequired,
  fn: PropTypes.object.isRequired,
  tryItOutEnabled: PropTypes.bool,
  allowTryItOut: PropTypes.bool,
  onTryoutClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onChangeKey: PropTypes.array,
  pathMethod: PropTypes.array.isRequired,
  getConfigs: PropTypes.func.isRequired,
  specPath: PropTypes.object.isRequired,
};

Parameters.defaultProps = {
  onTryoutClick: Function.prototype,
  onCancelClick: Function.prototype,
  tryItOutEnabled: false,
  allowTryItOut: true,
  onChangeKey: [],
  specPath: [],
};

export default Parameters;
