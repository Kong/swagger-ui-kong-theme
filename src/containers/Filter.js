import React from "react"

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
      <div>
        {filter === null || filter === false ? null :
          <div className="filter-container">
            <Col className="filter wrapper" mobile={12}>
              <input className="operation-filter-input" aria-label="Input for filtering by tag" placeholder="Filter by tag" type="text"
                     onChange={this.onFilterChange} value={filter === true || filter === "true" ? "" : filter}
                     disabled={isLoading} style={inputStyle}/>
            </Col>
          </div>
        }
      </div>
    )
  }
}
