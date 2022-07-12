import React from "react";
import Im, { fromJS, Iterable } from "immutable";
import PropTypes from "prop-types";
import ImPropTypes from "react-immutable-proptypes";

const DEFAULT_RESPONSE_KEY = "default";

/**
 * Replace invalid characters from a string to create an html-ready ID
 *
 * @param {string} id A string that may contain invalid characters for the HTML ID attribute
 * @param {string} [replacement=_] The string to replace invalid characters with; "_" by default
 * @return {string} Information about the parameter schema
 */
const createHtmlReadyId = (id, replacement = "_") => {
  return id.replace(/[^\w-]/g, replacement);
};

const getAcceptControllingResponse = (responses) => {
  if (!Im.OrderedMap.isOrderedMap(responses)) {
    // wrong type!
    return null;
  }

  if (!responses.size) {
    // responses is empty
    return null;
  }

  const suitable2xxResponse = responses.find((res, k) => {
    return (
      k.startsWith("2") && Object.keys(res.get("content") || {}).length > 0
    );
  });

  // try to find a suitable `default` responses
  const defaultResponse = responses.get("default") || Im.OrderedMap();
  const defaultResponseMediaTypes = (
    defaultResponse.get("content") || Im.OrderedMap()
  )
    .keySeq()
    .toJS();
  const suitableDefaultResponse = defaultResponseMediaTypes.length
    ? defaultResponse
    : null;

  return suitable2xxResponse || suitableDefaultResponse;
};

const defaultStatusCode = (responses) => {
  let codes = responses.keySeq();
  return codes.contains(DEFAULT_RESPONSE_KEY)
    ? DEFAULT_RESPONSE_KEY
    : codes
        .filter((key) => (key + "")[0] === "2")
        .sort()
        .first();
};

const Responses = (props) => {
  const {
    specActions,
    responses,
    tryItOutResponse,
    getComponent,
    getConfigs,
    specSelectors,
    fn,
    produces: _produces,
    producesValue,
    displayRequestDuration,
    specPath,
    path,
    method,
    oas3Selectors,
    oas3Actions,
  } = props;

  // These performance-enhancing checks were disabled as part of Multiple Examples
  // because they were causing data-consistency issues
  //
  // shouldComponentUpdate(nextProps) {
  //   // BUG: props.tryItOutResponse is always coming back as a new Immutable instance
  //   let render = this.props.tryItOutResponse !== nextProps.tryItOutResponse
  //   || this.props.responses !== nextProps.responses
  //   || this.props.produces !== nextProps.produces
  //   || this.props.producesValue !== nextProps.producesValue
  //   || this.props.displayRequestDuration !== nextProps.displayRequestDuration
  //   || this.props.path !== nextProps.path
  //   || this.props.method !== nextProps.method
  //   return render
  // }

  const onChangeProducesWrapper = (val) =>
    specActions.changeProducesValue([path, method], val);

  const onResponseContentTypeChange = ({ controlsAcceptHeader, value }) => {
    if (controlsAcceptHeader) {
      oas3Actions.setResponseContentType({
        value,
        path,
        method,
      });
    }
  };

  let defaultCode = defaultStatusCode(responses);

  const ContentType = getComponent("contentType");
  const LiveResponse = getComponent("liveResponse");
  const Response = getComponent("response");
  const InfoAlert = getComponent("infoAlert");

  let produces =
    _produces && _produces.size ? _produces : Responses.defaultProps.produces;

  const isSpecOAS3 = specSelectors.isOAS3();

  const acceptControllingResponse = isSpecOAS3
    ? getAcceptControllingResponse(responses)
    : null;

  const regionId = createHtmlReadyId(`${method}${path}_responses`);
  const controlId = `${regionId}_select`;
  return responses !== undefined &&
    responses?.entrySeq() &&
    responses?.entrySeq()?.size > 0 ? (
    <div className="responses-wrapper">
      <div className="opblock-section-header">
        <h4>Responses</h4>
        {specSelectors.isOAS3() ? null : (
          <label htmlFor={controlId}>
            <span>Response content type</span>
            <ContentType
              value={producesValue}
              ariaControls={regionId}
              ariaLabel="Response content type"
              className="execute-content-type"
              contentTypes={produces}
              controlId={controlId}
              onChange={onChangeProducesWrapper}
            />
          </label>
        )}
      </div>
      <div className="responses-inner">
        {!tryItOutResponse ? null : (
          <div>
            <LiveResponse
              response={tryItOutResponse}
              getComponent={getComponent}
              getConfigs={getConfigs}
              specSelectors={specSelectors}
              path={path}
              method={method}
              displayRequestDuration={displayRequestDuration}
            />
            <h4>Responses</h4>
          </div>
        )}
        <table
          aria-live="polite"
          className="responses-table"
          id={regionId}
          role="region"
        >
          <thead>
            <tr className="responses-header">
              <td className="col_header response-col_status">Code</td>
              <td className="col_header response-col_description">
                Description
              </td>
              {specSelectors.isOAS3() ? (
                <td className="col col_header response-col_links">Links</td>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {responses
              .entrySeq()
              .map(([code, response]) => {
                let className =
                  tryItOutResponse && tryItOutResponse.get("status") == code
                    ? "response_current"
                    : "";
                return (
                  <Response
                    key={code}
                    path={path}
                    method={method}
                    specPath={specPath.push(code)}
                    isDefault={defaultCode === code}
                    fn={fn}
                    className={className}
                    code={code}
                    response={response}
                    specSelectors={specSelectors}
                    controlsAcceptHeader={
                      response === acceptControllingResponse
                    }
                    onContentTypeChange={onResponseContentTypeChange}
                    contentType={producesValue}
                    getConfigs={getConfigs}
                    activeExamplesKey={oas3Selectors.activeExamplesMember(
                      path,
                      method,
                      "responses",
                      code
                    )}
                    oas3Actions={oas3Actions}
                    getComponent={getComponent}
                  />
                );
              })
              .toArray()}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <InfoAlert />
  );
};

Responses.propTypes = {
  tryItOutResponse: PropTypes.instanceOf(Iterable),
  responses: PropTypes.instanceOf(Iterable).isRequired,
  produces: PropTypes.instanceOf(Iterable),
  producesValue: PropTypes.any,
  displayRequestDuration: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired,
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  oas3Actions: PropTypes.object.isRequired,
  oas3Selectors: PropTypes.object.isRequired,
  specPath: ImPropTypes.list.isRequired,
  fn: PropTypes.object.isRequired,
};

Responses.defaultProps = {
  tryItOutResponse: null,
  produces: fromJS(["application/json"]),
  displayRequestDuration: false,
};

export default Responses;
