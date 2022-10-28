import React from "react"
import FocusTrap from "focus-trap-react"
import PropTypes from "prop-types"

export default class AuthorizationPopup extends React.Component {
  close = () => {
    let { authActions, system } = this.props
    authActions.showDefinitions(false)
    const lastFocusedEl = system.focusManagerSelectors.getLastActivatedButton()
    if (lastFocusedEl) {
      setTimeout(() => {
        lastFocusedEl.focus();
      }, 10)
    }
  }

  handleEscapeClose = (event) => {
    if (event.code === 'Escape') {
      this.close()
    }
  }

  componentDidMount(){
    if (this.headerRef) {
      setTimeout(() => {this.headerRef.focus()}, 100)
    }
    // The keyup event listener is used on the document to capture all possible escape
    // clicks inside the modal. Before, it was occasionally not firing maybe due to 
    // a listener on one of the components inside.
    document.addEventListener("keyup", this.handleEscapeClose)
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleEscapeClose)
  }

  render() {
    let { authSelectors, authActions, getComponent, errSelectors, specSelectors, fn: { AST = {} } } = this.props
    let definitions = authSelectors.shownDefinitions()
    const Auths = getComponent("auths")
    return (
      <div className="dialog-ux">
        <div className="backdrop-ux"></div>
        <FocusTrap>
          <div className="modal-ux">
            <div className="modal-dialog-ux">
              <div className="modal-ux-inner">
                <div className="modal-ux-header">
                  <h3
                    tabIndex="0"
                    ref={(_el) => this.headerRef = _el}
                  >
                    Available authorizations
                  </h3>
                  <button type="button" className="close-modal" onClick={ this.close }>
                    <svg width="20" height="20">
                      <use href="#close" xlinkHref="#close" />
                    </svg>
                  </button>
                </div>
                <div className="modal-ux-content">
                  {
                    definitions.valueSeq().map(( definition, key ) => {
                      return <Auths key={ key }
                        AST={AST}
                        definitions={ definition }
                        getComponent={ getComponent }
                        errSelectors={ errSelectors }
                        authSelectors={ authSelectors }
                        authActions={ authActions }
                        specSelectors={ specSelectors }
                      />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      </div>
    )
  }

  static propTypes = {
    fn: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    authSelectors: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    errSelectors: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
  }
}
