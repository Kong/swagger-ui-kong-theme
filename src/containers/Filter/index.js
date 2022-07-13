/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/containers/filter.jsx
 * @prettier
 */

import React from "react";
import DebounceInput from "react-debounce-input";

import styles from "./styles.module.css";

export default class FilterContainer extends React.Component {
  onFilterChange = (e) => {
    const {
      target: { value },
    } = e;
    this.props.layoutActions.updateFilter(value);
  };

  render() {
    const { specSelectors, layoutSelectors, getComponent } = this.props;
    const Col = getComponent("Col");

    const isLoading = specSelectors.loadingStatus() === "loading";
    const isFailed = specSelectors.loadingStatus() === "failed";
    const filter = layoutSelectors.currentFilter();

    const inputStyle = {};
    if (isFailed) inputStyle.color = "red";
    if (isLoading) inputStyle.color = "#aaa";

    return (
      <div>
        {filter === null || filter === false ? null : (
          <div className={styles.filterContainer}>
            <Col className={styles.filterWrapper} mobile={12}>
              <span className={styles.filterIcon}>
                <svg
                  xmlns="htpp://wwww.w3.org/2000/svg"
                  fill="none"
                  height={11}
                  width={14}
                >
                  <title>Filter</title>
                  <path
                    fill="#000"
                    fillOpacity=".45"
                    d="M14 0H0v2h14V0zm-2 3H2v2h10V3zM4 6h6v2H4V6zm4 3H6v2h2V9z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <DebounceInput
                aria-label="Input for filtering by tag"
                type="text"
                className="operation-filter-input"
                value={filter === true || filter === "true" ? "" : filter}
                debounceTimeout={1000}
                placeholder="Filter by tag"
                onChange={this.onFilterChange}
              />
            </Col>
          </div>
        )}
      </div>
    );
  }
}
