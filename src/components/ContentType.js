import React from "react"

/**
 * stripped down version of https://github.com/swagger-api/swagger-ui/blob/master/src/core/components/content-type.jsx
 * we needed to get the changes from https://github.com/swagger-api/swagger-ui/pull/7133
 * as well a default aria label
 */
export default class ContentType extends React.Component {

  componentDidMount() {
    // Needed to populate the form, initially
    if (this.props.contentTypes) {
      // `contentTypes` can be one of `ImPropTypes.list`, `ImPropTypes.set`, `ImPropTypes.seq` and `array`
      const firstElement = typeof this.props.contentTypes.first === "function" ? this.props.contentTypes.first() : this.props.contentTypes[0]
      this.props.onChange(firstElement)
    }
  }

  componentWillReceiveProps(nextProps) {
    // `contentTypes` can be one of `ImPropTypes.list`, `ImPropTypes.set`, `ImPropTypes.seq` and `array`
    if (!nextProps.contentTypes || (!nextProps.contentTypes.size && !nextProps.contentTypes.length)) {
      return
    }

    if (!nextProps.contentTypes.includes(nextProps.value)) {
      // `contentTypes` can be one of `ImPropTypes.list`, `ImPropTypes.set`, `ImPropTypes.seq` and `array`
      const firstElement = typeof nextProps.contentTypes.first === "function" ? nextProps.contentTypes.first() : nextProps.contentTypes[0]
      nextProps.onChange(firstElement)
    }
  }

  onChangeWrapper = e => this.props.onChange(e.target.value)

  render() {
    let { ariaControls, ariaLabel = 'Content type', className, contentTypes, controlId, value } = this.props


    return (
      <div className={"content-type-wrapper " + (className || "")}>
        <select aria-controls={ariaControls} aria-label={ariaLabel} className="content-type" id={controlId} onChange={this.onChangeWrapper} value={value || ""} >
          {contentTypes.map((val) => {
            return <option key={val} value={val}>{val}</option>
          })}
        </select>
      </div>
    )
  }
}
