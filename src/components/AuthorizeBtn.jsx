import React from "react"
import PropTypes from "prop-types"

export default class AuthorizeBtn extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    isAuthorized: PropTypes.bool,
    showPopup: PropTypes.bool,
    getComponent: PropTypes.func.isRequired
  }

  render() {
    let { isAuthorized, showPopup, onClick, getComponent } = this.props

    //must be moved out of button component
    const AuthorizationPopup = getComponent("authorizationPopup", true)
    const Button = getComponent("Button")

    const icon = (
      <svg width="20" height="20">
        <use href={ isAuthorized ? "#locked" : "#unlocked" } xlinkHref={ isAuthorized ? "#locked" : "#unlocked" } />
      </svg>
    )

    return (
      <div className="auth-wrapper">
        <Button onClick={onClick} icon={icon}>
          Authorize
        </Button>
        { showPopup && <AuthorizationPopup /> }
      </div>
    )
  }
}
