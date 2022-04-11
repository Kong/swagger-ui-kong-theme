/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/highlight-code.jsx
 * @prettier
 */

import React, { Component } from "react"
import { highlight } from "../helpers/helpers"
import saveAs from "js-file-download"

export default class HighlightCode extends Component {
  componentDidMount() {
    highlight(this.el)
  }

  componentDidUpdate() {
    highlight(this.el)
  }

  initializeComponent = (c) => {
    this.el = c
  }

  downloadText = () => {
    saveAs(this.props.value, this.props.fileName || "response.txt")
  }

  preventYScrollingBeyondElement = (e) => {
    const target = e.target

    var deltaY = e.nativeEvent.deltaY
    var contentHeight = target.scrollHeight
    var visibleHeight = target.offsetHeight
    var scrollTop = target.scrollTop

    const scrollOffset = visibleHeight + scrollTop

    const isElementScrollable = contentHeight > visibleHeight
    const isScrollingPastTop = scrollTop === 0 && deltaY < 0
    const isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0

    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
      e.preventDefault()
    }
  }

  render () {
    let { value, className, downloadable } = this.props
    className = className || ""

    return (
      <div className="highlight-code" tabIndex={0}>
        { !downloadable ? null :
          <div
            role="button"
            aria-label="download contents"
            className="download-contents"
            onClick={this.downloadText}
          >
            Download
          </div>
        }
        <pre
          ref={this.initializeComponent}
          onWheel={this.preventYScrollingBeyondElement}
          className={className + " microlight"}
          tabIndex="0">
          {value}
        </pre>
      </div>
    )
  }
}
