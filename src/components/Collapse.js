/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/layout-utils.jsx Collapse class
 * @prettier
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

const NoMargin = ({ children, id }) => {
  if (id) {
    return <div role="region" id={id} style={{ height: "auto", border: "none", margin: 0, padding: 0 }}> {children} </div>
  } else {
    return <div role="region" style={{ height: "auto", border: "none", margin: 0, padding: 0 }}> {children} </div>
  }

}

NoMargin.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string
}

export default class Collapse extends Component {

  static propTypes = {
    isOpened: PropTypes.bool,
    children: PropTypes.node.isRequired,
    animated: PropTypes.bool,
    id: PropTypes.string
  }

  static defaultProps = {
    isOpened: false,
    animated: false
  }

  renderNotAnimated() {
    if (!this.props.isOpened) {
      return <noscript />
    }

    return (
      <NoMargin id={this.props.id}>
        {this.props.children}
      </NoMargin>
    )
  }

  render() {
    let { animated, isOpened, children, id } = this.props

    if (!animated)
      return this.renderNotAnimated()

    children = isOpened ? children : null
    return (
      <NoMargin id={id}>
        {children}
      </NoMargin>
    )
  }

}