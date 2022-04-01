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

  handleKeyDownToggle = (event) => {
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
    const { title, classes } = this.props


    return (
      <div className={classes || ""}>
        {this.state.expanded && this.props.hideSelfOnExpand ? this.props.children : (
          <div>
            { title && 
              <div 
                role="button"
                aria-pressed={this.state.expanded}
                onClick={this.toggleCollapsed}
                onKeyDown={(e) => this.handleKeyDownToggle(e)}
                tabIndex={0}
                style={{ "cursor": "pointer", "display": "inline-block" }}
              >{title}</div>
            }
            <span onClick={ this.toggleCollapsed } style={{ "cursor": "pointer" }}>
              <span className={ "model-toggle" + ( this.state.expanded ? "" : " collapsed" ) }></span>
            </span>
            { this.state.expanded ? this.props.children :this.state.collapsedContent }
          </div>
        )}
      </div>
    )
  }
}
