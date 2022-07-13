import React from 'react';
import PropTypes from "prop-types"

const AuthorizeBtn = (props) => {
    let { isAuthorized, showPopup, onClick, getComponent } = props;

    //must be moved out of button component
    const AuthorizationPopup = getComponent("authorizationPopup", true);

    return (
        <div className="auth-wrapper">
            <button className={isAuthorized ? "btn authorize locked" : "btn authorize unlocked"} onClick={onClick}>
                <div className="authorize-inner">
                     <svg width="20" height="20">
                        <use href={ isAuthorized ? "#locked" : "#unlocked" } xlinkHref={ isAuthorized ? "#locked" : "#unlocked" } />
                    </svg>
                <span>Authorize</span>
                </div>
            </button>
            { showPopup && <AuthorizationPopup /> }
        </div>
    )

};

AuthorizeBtn.propTypes = {
    onClick: PropTypes.func,
    isAuthorized: PropTypes.bool,
    showPopup: PropTypes.bool,
    getComponent: PropTypes.func.isRequired
}

export default AuthorizeBtn;
