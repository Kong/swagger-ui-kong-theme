import React from 'react';

const InfoAlert = (props) => {

    const allowedTypes = ['info', 'warning', 'success', 'danger'];

    const {
        type = "danger",
        msg = "No response found!"
    } = props;

    if (allowedTypes.indexOf(type) < 0) {
        return null;
    }
    return (
        <div className={`alert-message alert-message-${type}`}>
        <p>{msg}</p>
    </div>);
};

export default InfoAlert;
