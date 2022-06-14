import React from "react"

const TryItOutButton = (props) => {
  const {onTryoutClick, onCancelClick, enabled} = props;

  return (
      <div className="try-out">
        {
          enabled ? <button aria-label="Cancel sending an example request" className="btn try-out__btn cancel"
                            onClick={onCancelClick}>Cancel</button>
              : <button aria-label="Try sending an example request" className="btn try-out__btn"
                        onClick={onTryoutClick}>Try it out </button>
        }
      </div>
  )
};

export default TryItOutButton;
