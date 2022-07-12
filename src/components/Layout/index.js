import React, { useMemo } from "react";

import styles from "./styles.module.css";
import InfoAlert from "components/InfoAlert";
import {ViewSpecBtn} from "components/AugmentingInfo";

function RegisterBtnContainer() {
  function handleRegisterClick() {
    if (window.onRegisterClick) {
      window.onRegisterClick();
    }
  }

  return (
    <div className={styles.registerWrapper}>
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
  try {
    const SvgAssets = getComponent("SvgAssets");
    const InfoContainer = getComponent("InfoContainer", true);
    const VersionPragmaFilter = getComponent("VersionPragmaFilter");
    const Operations = getComponent("operations", true);
    const Models = getComponent("Models", true);
    const Col = getComponent("Col");
    const Errors = getComponent("errors", true);
    const ServersContainer = getComponent("ServersContainer", true);
    const SchemesContainer = getComponent("SchemesContainer", true);
    const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
    const Sidebar = getComponent("Sidebar", true);

    const isSwagger2 = specSelectors.isSwagger2();
    const isOAS3 = specSelectors.isOAS3();

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
      const loadingStatus = specSelectors?.loadingStatus();

      return  loadingStatus && stateMessageMap[loadingStatus]();
    }, [specSelectors, errSelectors]);

    const config = getConfigs();
    const swaggerAbsoluteTop = {
      top: (config.theme && config.theme.swaggerAbsoluteTop) || "0",
    };
    const hasSidebar = config.theme?.hasSidebar;

    const servers = specSelectors.servers();
    const schemes = specSelectors.schemes();

    const hasServers = servers && servers.size;
    const hasSchemes = schemes && schemes.size;
    const hasSecurityDefinitions = !!specSelectors.securityDefinitions();
    const hasRegistration = window.appRegistrationEnabled;

    if (!loadingMessage && isSpecEmpty) {
      return <h4>No valid API definition provided.</h4>;
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
        <div className={"swagger-ui " + (hasSidebar && styles.hasSidebar)}>
          <SvgAssets />
          <VersionPragmaFilter
            isSwagger2={isSwagger2}
            isOAS3={isOAS3}
            alsoShow={<Errors />}
          >
            <div className="scheme-container">
              <Col className="schemes wrapper" mobile={12}>
                {hasServers ? <ServersContainer /> : <InfoAlert msg="No Servers found !"/>}
                {hasSchemes ? <SchemesContainer /> : <InfoAlert msg="No Schemes found !"/>}
                <div className="actions">
                  <ViewSpecBtn />
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
  } catch (error) {
    return <h1>An error has occurred </h1>;
  }
}
