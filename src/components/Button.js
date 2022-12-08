import classNames from "classnames"
import React from "react"
import PropTypes from "prop-types"

export const ButtonSize = {
  small: 'small',
  medium: 'medium'
}

export const ButtonAppearance = {
  primary: 'primary',
  outline: 'outline',
}

const buttonSizeToClassNameMap = {
  [ButtonSize.small]: 'btn-sm',
  [ButtonSize.medium]: undefined, // no additional class needed
}

const buttonAppearanceToClassNameMap = {
  [ButtonAppearance.primary]: 'btn-primary',
  [ButtonAppearance.outline]: 'btn-outline',
}

const Button = ({
  children,
  appearance = ButtonAppearance.primary,
  size = ButtonSize.medium,
  icon,
  ...restProps
}) => {
  const className = classNames(
    'btn',
    buttonSizeToClassNameMap[size],
    buttonAppearanceToClassNameMap[appearance]
  )

  return (
    <button {...restProps} className={className}>
      {icon && (
        <div className="icon">
          {icon}
        </div>
      )}
      {children}
    </button>
  )
}

Button.propTypes = {
  appearance: PropTypes.oneOf(Object.values(ButtonAppearance)),
  size: PropTypes.oneOf(Object.values(ButtonSize)),
  isRounded: PropTypes.bool,
  icon: PropTypes.elementType
}

export default Button
