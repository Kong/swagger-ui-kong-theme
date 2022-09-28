/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/model-collapse.jsx
 * @prettier
 */

import React, { Component } from "react"

export default class ModelCollapse extends Component {
  constructor(props, context) {
    super(props, context)

    let { expanded, collapsedContent } = this.props

    this.state = {
      expanded: expanded,
      collapsedContent: collapsedContent || ModelCollapse.defaultProps.collapsedContent
    }
  }

  componentDidMount() {
    const { hideSelfOnExpand, expanded, modelName } = this.props
    if (hideSelfOnExpand && expanded) {
      // We just mounted pre-expanded, and we won't be going back..
      // So let's give our parent an `onToggle` call..
      // Since otherwise it will never be called.
      this.props.onToggle(modelName, expanded)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expanded !== nextProps.expanded) {
      this.setState({ expanded: nextProps.expanded })
    }
  }

  handleKeypress = (event) => {
    if (event.nativeEvent.code === "Enter" || event.nativeEvent.code === "Space") {
      this.toggleCollapsed()
    }
  }

  toggleCollapsed = () => {
    if (this.props.onToggle) {
      this.props.onToggle(this.props.modelName, !this.state.expanded)
    }

    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { title, classes, displayName } = this.props


    return (
      <div className={classes || ""}>
        {this.state.expanded && this.props.hideSelfOnExpand ? this.props.children : (
          <div>
            <div
              role="button"
              title={displayName ? `Show ${displayName} model` : 'Show model'}
              aria-pressed={this.state.expanded}
              onClick={this.toggleCollapsed}
              onKeyUp={(e) => this.handleKeypress(e)}
              tabIndex={0}
              style={{ "cursor": "pointer", "display": "inline-block" }}
            >
              {title ? title : null}
              <span className={"toggle-model-icon" + (this.state.expanded ? "" : " collapsed")}>
                <svg className={"arrow" + (this.state.expanded && title ? " opened" : "")} width="12" height="12">
                  <use href={this.state.expanded ? "#large-arrow-down" : "#large-arrow"} xlinkHref={this.state.expanded ? "#large-arrow-down" : "#large-arrow"} />
                </svg>
              </span>
            </div>
            {this.state.expanded ? this.props.children : this.state.collapsedContent}
          </div>
        )}
      </div>
    )
  }
}
