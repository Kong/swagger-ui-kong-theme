/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/containers/filter.jsx
 * @prettier
 */

import React from "react"
import DebounceInput from "react-debounce-input"
import styles from './Filter.module.css'

export default class FilterContainer extends React.Component {
  onFilterChange = (e) => {
    const {target: {value}} = e
    this.props.layoutActions.updateFilter(value)
  }

  render () {
    const { specSelectors, layoutSelectors, getComponent } = this.props
    const Col = getComponent("Col")

    const isLoading = specSelectors.loadingStatus() === "loading"
    const isFailed = specSelectors.loadingStatus() === "failed"
    const filter = layoutSelectors.currentFilter()

    const inputStyle = {}
    if (isFailed) inputStyle.color = "red"
    if (isLoading) inputStyle.color = "#aaa"

    if (!filter) {
      return null
    }

    return (
      <div className={styles.filter}>
        <Col className={styles.inputWrapper} mobile={12}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" fill="none" className={styles.inputIcon}>
            <path fill="currentColor" fillRule="evenodd" d="M14 0H0v2h14V0zm-2 3H2v2h10V3zM4 6h6v2H4V6zm4 3H6v2h2V9z" clipRule="evenodd" />
          </svg>
          <DebounceInput
            aria-label="Input for filtering by tag"
            type="text"
            className={styles.input}
            value={filter === true || filter === "true" ? "" : filter}
            debounceTimeout={1000}
            placeholder="Filter by tag"
            onChange={this.onFilterChange} />
        </Col>
      </div>
    )
  }
}
