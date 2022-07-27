/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/deep-link.jsx
 * @prettier
 */

import React from "react"
import PropTypes from "prop-types"

export const DeepLink = ({ enabled, path, text, showArrow, isShown }) => {
  return (
    <a 
      className={showArrow ? "nostyle has-arrow" : "nostyle"}
      onClick={enabled ? (e) => e.preventDefault() : null}
      title={showArrow ? isShown ? "Collapse operation": "Expand operation" : null}
      aria-expanded={showArrow ? isShown : null}
      href={enabled ? `#/${path}` : null}
    >
      <span>{text}</span>
      {showArrow && (
        <svg
          className="arrow"
          width="15"
          height="15"
        >
          <use href={isShown ? "#large-arrow-down" : "#large-arrow"} xlinkHref={isShown ? "#large-arrow-down" : "#large-arrow"} />
        </svg>
      )}
    </a>
  )
}
DeepLink.propTypes = {
  enabled: PropTypes.bool,
  isShown: PropTypes.bool,
  showArrow: PropTypes.bool,
  path: PropTypes.string,
  text: PropTypes.string
}

export default DeepLink
