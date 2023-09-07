/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/containers/filter.jsx
 * @prettier
 */

import React from "react"
import DebounceInput from "react-debounce-input"

export default class FilterContainer extends React.Component {
  onFilterChange = (e) => {
    const {target: {value}} = e
    this.props.layoutActions.updateFilter(value)
  }

  render () {
    const {specSelectors, layoutSelectors, getComponent} = this.props
    const Col = getComponent("Col")

    const isLoading = specSelectors.loadingStatus() === "loading"
    const isFailed = specSelectors.loadingStatus() === "failed"
    const filter = layoutSelectors.currentFilter()

    const inputStyle = {}
    if (isFailed) inputStyle.color = "red"
    if (isLoading) inputStyle.color = "#aaa"

    return (
      <div className={ this.props.className }>
        {filter === null || filter === false ? null :
          <div className="filter-container">
            <Col className="filter wrapper" mobile={12}>
            <DebounceInput
              aria-label="Input for filtering by tag"
              type="text"
              className="operation-filter-input"
              value={filter === true || filter === "true" ? "" : filter}
              debounceTimeout={1000}
              placeholder="Filter by tag"
              onChange={this.onFilterChange} />
            </Col>
          </div>
        }
      </div>
    )
  }
}
