import React from "react"

class RegisterBtnContainer extends React.Component {
  handleRegisterClick() {
    if (window.onRegisterClick) {
      window.onRegisterClick()
    }
  }

  render(){
    return (
      <div className="register-wrapper">
        <button onClick={() => this.handleRegisterClick()}>
          Register
        </button>
      </div>
    )
  }
}


// Create the layout component
export default class KongLayout extends React.Component {
  constructor(props) {
    super(props)

    this.mainContainerRef = null
    this.originalDocumentTitle = null
  }

  initializeComponent = (component) => {
    this.mainContainerRef = component
  }

  componentDidMount() {
    this.originalDocumentTitle = document.title
  }

  componentDidUpdate() {
    // Find if there's any invalid parameters
    const hasInvalidParameters = this.mainContainerRef?.querySelector('.error-parameter-name')

    if (hasInvalidParameters) {
      document.title = `Error - ${this.originalDocumentTitle}`
    } else {
      document.title = this.originalDocumentTitle
    }
  }

  render() {
    const {
      errSelectors,
      specSelectors,
      getComponent,
      getConfigs
    } = this.props

    let SvgAssets = getComponent("SvgAssets")
    let InfoContainer = getComponent("InfoContainer", true)
    let VersionPragmaFilter = getComponent("VersionPragmaFilter")
    let Operations = getComponent("operations", true)
    let Models = getComponent("Models", true)
    let Row = getComponent("Row")
    let Col = getComponent("Col")
    let Errors = getComponent("errors", true)

    const ServersContainer = getComponent("ServersContainer", true)
    const SchemesContainer = getComponent("SchemesContainer", true)
    const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true)
    const Sidebar = getComponent("Sidebar", true)


    let isSwagger2 = specSelectors.isSwagger2()
    let isOAS3 = specSelectors.isOAS3()

    const isSpecEmpty = !specSelectors.specStr()

    const loadingStatus = specSelectors.loadingStatus()

    let loadingMessage = null

    const config = getConfigs()
    const swaggerAbsoluteTop = {
      top: config.theme && config.theme.swaggerAbsoluteTop || '0'
    }
    const hasSidebar = config.theme && config.theme.hasSidebar

    if (loadingStatus === "loading") {
      loadingMessage = <div className="info">
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </div>
    }

    if (loadingStatus === "failed") {
      loadingMessage = <div className="info">
        <div className="loading-container">
          <h4 className="title">Failed to load API definition.</h4>
          <Errors />
        </div>
      </div>
    }

    if (loadingStatus === "failedConfig") {
      const lastErr = errSelectors.lastError()
      const lastErrMsg = lastErr ? lastErr.get("message") : ""
      loadingMessage = <div className="info" style={{ maxWidth: "880px", marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
        <div className="loading-container">
          <h4 className="title">Failed to load remote configuration.</h4>
          <p>{lastErrMsg}</p>
        </div>
      </div>
    }

    if (!loadingMessage && isSpecEmpty) {
      loadingMessage = <h4>No API definition provided.</h4>
    }

    if (loadingMessage) {
      return <div className="swagger-ui">
        <div className="loading-container">
          {loadingMessage}
        </div>
      </div>
    }

    const servers = specSelectors.servers()
    const schemes = specSelectors.schemes()

    const hasServers = servers && servers.size
    const hasSchemes = schemes && schemes.size
    const hasSecurityDefinitions = !!specSelectors.securityDefinitions()
    const hasRegistration = window.appRegistrationEnabled

    return (
    <div className='wide' style={swaggerAbsoluteTop}>
      { hasSidebar && <Sidebar getConfigs={getConfigs}/> }
      <div className={'swagger-ui ' + ( hasSidebar && 'has-sidebar')}>
          <SvgAssets />
          <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors />}>
            <div className="scheme-container">
              <Col className="schemes wrapper" mobile={12}>
                {hasServers ? (<ServersContainer />) : null}
                {hasSchemes ? (<SchemesContainer />) : null}
                <div className="actions">
                  {hasSecurityDefinitions ? (<AuthorizeBtnContainer />) : null}
                  {hasRegistration ? (<RegisterBtnContainer />) : null}
                </div>
              </Col>
            </div>

            <Errors />
            <div className="main-container" ref={this.initializeComponent}>
              <InfoContainer />
              <Operations />
              <Models />
            </div>
          </VersionPragmaFilter>
      </div>
    </div>
    )
  }
}

