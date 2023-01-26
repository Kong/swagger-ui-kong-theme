import classNames from "classnames"
import React from "react"
import { ButtonAppearance } from './Button'
import { overrideScrollPositionForSelector } from "../helpers/helpers"
import styles from './Layout.module.css'

const ErrorSVG = () => (<svg width="408" height="232" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>Error</title>
  <rect x="4" y="2" width="400" height="224" rx="8" fill="var(--section_colors-tertiary)" />
  <rect x="5" y="3" width="398" height="222" rx="7" stroke="var(--section_colors-stroke)" strokeWidth="2" strokeLinejoin="round" strokeDasharray="8 4" />
  <path d="M192.629 145.012l4.875-14.074h2.461L193.637 148h-1.992l-6.317-17.062h2.449l4.852 14.074zm6.691 1.851c0-.375.11-.687.328-.937.227-.25.563-.375 1.008-.375.446 0 .782.125 1.008.375.234.25.352.562.352.937 0 .36-.118.66-.352.903-.226.242-.562.363-1.008.363-.445 0-.781-.121-1.008-.363a1.302 1.302 0 01-.328-.903zm14.778-3.668c.015-.929.121-1.664.316-2.203.195-.539.594-1.137 1.195-1.793l1.536-1.582c.656-.742.984-1.539.984-2.39 0-.821-.215-1.461-.645-1.922-.429-.469-1.054-.703-1.875-.703-.797 0-1.437.21-1.921.632-.485.422-.727.989-.727 1.7h-2.168c.016-1.266.465-2.286 1.348-3.059.89-.781 2.047-1.172 3.468-1.172 1.477 0 2.625.399 3.446 1.195.828.79 1.242 1.875 1.242 3.258 0 1.367-.633 2.715-1.899 4.043l-1.277 1.266c-.57.633-.855 1.543-.855 2.73h-2.168zm-.094 3.715c0-.351.105-.644.316-.879.219-.242.539-.363.961-.363.422 0 .742.121.961.363.219.235.328.528.328.879 0 .352-.109.645-.328.879-.219.227-.539.34-.961.34-.422 0-.742-.113-.961-.34-.211-.234-.316-.527-.316-.879z" fill="var(--text_colors-secondary)" />
  <path fill="var(--section_colors-stroke)" d="M22 60h363v2H22z" />
  <rect x="22" y="20" width="82" height="24" rx="4" fill="var(--section_colors-stroke" />
  <rect x="112" y="20" width="64" height="24" rx="4" fill="var(--section_colors-stroke" />
  <rect x="303" y="20" width="47" height="24" rx="4" fill="var(--section_colors-stroke" />
  <rect x="358" y="20" width="28" height="24" rx="4" fill="var(--section_colors-stroke" />
</svg>)

class RegisterBtnContainer extends React.Component {
  handleRegisterClick = () => {
    const config = this.props.config
    if (config.theme && config.theme.onRegisterClick) {
      config.theme.onRegisterClick()
    }
  }

  render () {
    const { config } = this.props

    const { currentVersion } = config.theme || {}

    return (
      <div className="inline register-wrapper">
        <button data-testid="register-button" className="k-button primary ml-5" onClick={() => this.handleRegisterClick()}>
          {currentVersion.version ? `Register for ${currentVersion.version}` : 'Register'}
        </button>
      </div>
    )
  }
}


// View Raw button
class ViewSpec extends React.Component {
  handleViewSpecClick = () => {
    const config = this.props.config
    if (config.theme && config.theme.onViewSpecClick) {
      config.theme.onViewSpecClick()
    }
  }

  render () {
    const { getComponent } = this.props

    const Button = getComponent('Button')

    return (
      <Button appearance={ButtonAppearance.outline} onClick={this.handleViewSpecClick}>
        View Raw
      </Button>
    )
  }
}


// Create the layout component
export default class KongLayout extends React.Component {
  componentDidMount () {
    const hash = window.location.hash
    if (!hash || !hash.startsWith('#/doc-')) {
      return
    }

    const destination = document.getElementById(hash.slice(2))
    if (!destination) {
      return
    }

    window.scrollTo({ top: destination.offsetTop, behavior: 'smooth' })

    const markdownDiv = document.querySelector('.service-package-markdown .table-of-contents')
    if (!markdownDiv) {
      return
    }

    overrideScrollPositionForSelector('.service-package-markdown .header-anchor')

    const tocDiv = document.querySelector('.service-package-markdown .table-of-contents')
    if (!tocDiv) {
      return
    }

    overrideScrollPositionForSelector('.service-package-markdown .table-of-contents a')
  }

  handleOnSelectSpec = (e) => {
    const config = this.props.getConfigs()
    if (config.theme && config.theme.onSelectSpec) {
      config.theme.onSelectSpec(e)
    }
  }

  render () {
    const {
      errSelectors,
      specSelectors,
      getComponent,
      getConfigs
    } = this.props

    const SvgAssets = getComponent('SvgAssets')
    const InfoContainer = getComponent('InfoContainer', true)
    const VersionPragmaFilter = getComponent('VersionPragmaFilter')
    const Operations = getComponent('operations', true)
    const Models = getComponent('Models', true)
    const Errors = getComponent('errors', true)

    const info = specSelectors.info()

    const ServersContainer = getComponent('ServersContainer', true)
    const SchemesContainer = getComponent('SchemesContainer', true)
    const AuthorizeBtnContainer = getComponent('AuthorizeBtnContainer', true)
    const Sidebar = getComponent('Sidebar', true)

    const isSwagger2 = specSelectors.isSwagger2()
    const isOAS3 = specSelectors.isOAS3()

    const loadingStatus = specSelectors.loadingStatus()

    let loadingMessage = null

    const config = getConfigs()

    const versionDeprecated = config.versionDeprecated

    const {
      serviceDoc,
      hasSidebar,
      defaultServiceVersionId,
      deprecatedCopy,
      serviceVersions,
      applicationRegistrationEnabled
    } = config.theme || {}

    if (loadingStatus === 'loading') {
      loadingMessage = <div className="info">
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      </div>
    }

    if (loadingStatus === 'failed') {
      loadingMessage = <div className="info">
        <div className="loading-container">
          <h4 className="title">Failed to load API definition.</h4>
          <Errors />
        </div>
      </div>
    }

    if (loadingStatus === 'failedConfig') {
      const lastErr = errSelectors.lastError()
      const lastErrMsg = lastErr ? lastErr.get('message') : ''

      loadingMessage = <div className="info" style={{ maxWidth: '880px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
        <div className="loading-container">
          <h4 className="title">Failed to load remote configuration.</h4>
          <p>{lastErrMsg}</p>
        </div>
      </div>
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
    const hasSpec = !!specSelectors.specStr() && specSelectors.spec().get('statusCode') !== 404

    const actionBarItems = [
      hasServers && <div className={styles.serversWrapper}><ServersContainer key="servers" /></div>,
      hasSchemes && <div key="schemas" className={styles.schemesWrapper}><SchemesContainer /></div>,
      <div key="buttons" className={styles.buttonsWrapper}>
        {hasSpec && (
          <div className={styles.button}>
            <ViewSpec config={config} getComponent={getComponent} />
          </div>
        )}
        {hasSecurityDefinitions && (
          <div className={styles.button}>
            <AuthorizeBtnContainer />
          </div>
        )}
        {applicationRegistrationEnabled && (
          <div className={styles.button}>
            <RegisterBtnContainer config={config} />
          </div>
        )}
      </div>
    ].filter(Boolean)

    const actionBarJustification = actionBarItems.length > 1 ? 'justify-between' : 'justify-end'

    return (
      <div className={classNames(styles.wrapper, 'container mx-auto max-w-screen-2xl breadcrumb-margin')}>
        <div className={'px-6 swagger-ui ' + (hasSidebar && 'has-sidebar')}>
          <div className={styles.schemeContainer}>
            <div className="schemes wrapper align-items-center px-0 flex-col">
              {versionDeprecated ? <p className="deprecated-alert w-full mt-1 mb-3">{deprecatedCopy}</p> : null}
              <div className={`actions d-flex ${actionBarJustification} align-items-center w-full mt-3 mb-3`}>
                {actionBarItems}
              </div>
            </div>
          </div>
        </div>
        {hasSidebar && <Sidebar getConfigs={getConfigs} />}

        <div className={'swagger-ui ' + (hasSidebar && 'has-sidebar')}>
          <SvgAssets />

          {!hasSpec ? (
            <div className={styles.container}>
              <div className="info">
                {serviceDoc &&
                  <div
                    className='service-package-markdown markdown-body'
                    dangerouslySetInnerHTML={{ __html: serviceDoc }}>
                  </div>
                }
              </div>

              <div
                data-testid="spec-error-state"
                className="mt-7 text-center">
                <div className="d-flex justify-content-center mb-5">
                  <ErrorSVG />
                </div>
                <p className="text-center color-text_colors-primary mb-2">No version spec found</p>
                <p className="text-center">
                  <a
                    href="/"
                    data-testid="spec-error-catalog-link"
                    className="color-blue-500"
                  >
                    Return to catalog
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <VersionPragmaFilter isSwagger2={isSwagger2} isOAS3={isOAS3} alsoShow={<Errors />}>
              <Errors />
              <div className={styles.container}>
                <InfoContainer />
                <Operations />
                <Models />
              </div>
            </VersionPragmaFilter>
          )}
        </div>
      </div>
    )
  }
}
