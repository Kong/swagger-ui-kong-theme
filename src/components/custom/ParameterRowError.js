/**
 * Custom file
 * @prettier
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ParameterRowError extends Component {
  constructor(props) {
    super(props)

    this.el = null
  }

  componentWillReceiveProps(props) {
    const { errors } = props

    if (
      this.props.errors.length !== props.errors.length &&
      errors.length &&
      this.el
    ) {
      setTimeout(() => {
        this.el.focus()
      })
    }
  }

  initializeComponent = (c) => {
    this.el = c
  }

  render() {
    const { errors } = this.props

    return (
      <div
        className='parameter-row-error'
        tabIndex='-1'
        ref={this.initializeComponent}
      >
        {errors.join('. ')}
      </div>
    )
  }
}

ParameterRowError.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
}

export default ParameterRowError
