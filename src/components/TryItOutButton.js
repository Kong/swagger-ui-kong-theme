import React from "react"

export default class TryItOutButton extends React.Component {
  render() {
    const { onTryoutClick, onCancelClick, enabled } = this.props

    return (
      <div className="try-out">
        {
          enabled ? <button aria-description="Cancel sending an example request" className="btn try-out__btn cancel" onClick={ onCancelClick }>Cancel</button>
                  : <button aria-description="Try sending an example request" className="btn try-out__btn" onClick={ onTryoutClick }>Try it out </button>
        }
      </div>
    )
  }
}
