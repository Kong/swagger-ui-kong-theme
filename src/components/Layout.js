import React, { useMemo } from "react";

function RegisterBtnContainer() {
  function handleRegisterClick() {
    if (window.onRegisterClick) {
      window.onRegisterClick();
    }
  }

  return (
    <div className="register-wrapper">
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
}

// Create the layout component
export default function KongLayout({
  errSelectors,
  specSelectors,
  getComponent,
  getConfigs,
}) {
  let SvgAssets = getComponent("SvgAssets");
  let InfoContainer = getComponent("InfoContainer", true);
  let VersionPragmaFilter = getComponent("VersionPragmaFilter");
  let Operations = getComponent("operations", true);
  let Models = getComponent("Models", true);
  let Col = getComponent("Col");
  let Errors = getComponent("errors", true);
  const ServersContainer = getComponent("ServersContainer", true);
  const SchemesContainer = getComponent("SchemesContainer", true);
  const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
  const Sidebar = getComponent("Sidebar", true);

  let isSwagger2 = specSelectors.isSwagger2();
  let isOAS3 = specSelectors.isOAS3();

  const isSpecEmpty = !specSelectors.specStr();

  const loadingMessage = useMemo(() => {
    const stateMessageMap = {
      success: () => null,
      loading: () => (
        <div className="info">
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        </div>
      ),
      failed: () => (
        <div className="info">
          <div className="loading-container">
            <h4 className="title">Failed to load API definition.</h4>
            <Errors />
          </div>
        </div>
      ),
      failedConfig: () => {
        const lastErr = errSelectors.lastError();
        const lastErrMsg = lastErr ? lastErr.get("message") : "";

        return (
          <div
            className="info"
            style={{
              maxWidth: "880px",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
            }}
          >
            <div className="loading-container">
              <h4 className="title">Failed to load remote configuration.</h4>
              <p>{lastErrMsg}</p>
            </div>
          </div>
        );
      },
    };

    const loadingStatus = specSelectors.loadingStatus();

    return stateMessageMap[loadingStatus]();
  }, [specSelectors, errSelectors]);

  const config = getConfigs();
  const swaggerAbsoluteTop = {
    top: (config.theme && config.theme.swaggerAbsoluteTop) || "0",
  };
  const hasSidebar = config.theme && config.theme.hasSidebar;

  const servers = specSelectors.servers();
  const schemes = specSelectors.schemes();

  const hasServers = servers && servers.size;
  const hasSchemes = schemes && schemes.size;
  const hasSecurityDefinitions = !!specSelectors.securityDefinitions();
  const hasRegistration = window.appRegistrationEnabled;

  if (!loadingMessage && isSpecEmpty) {
    return <h4>No API definition provided.</h4>;
  }

  if (loadingMessage) {
    return (
      <div className="swagger-ui">
        <div className="loading-container">{loadingMessage}</div>
      </div>
    );
  }

  return (
    <div className="wide" style={swaggerAbsoluteTop}>
      {hasSidebar && <Sidebar getConfigs={getConfigs} />}
      <div className={"swagger-ui " + (hasSidebar && "has-sidebar")}>
        <SvgAssets />
        <VersionPragmaFilter
          isSwagger2={isSwagger2}
          isOAS3={isOAS3}
          alsoShow={<Errors />}
        >
          <div className="scheme-container">
            <Col className="schemes wrapper" mobile={12}>
              {hasServers ? <ServersContainer /> : null}
              {hasSchemes ? <SchemesContainer /> : null}
              <div className="actions">
                {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
                {hasRegistration ? <RegisterBtnContainer /> : null}
              </div>
            </Col>
          </div>

          <Errors />
          <div className="main-container">
            <InfoContainer />
            <Operations />
            <Models />
          </div>
        </VersionPragmaFilter>
      </div>
    </div>
  );
};
