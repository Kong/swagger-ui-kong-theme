/**
 * Original file: https://github.com/swagger-api/swagger-ui/blob/3.x/src/core/components/examples-select.jsx
 * @prettier
 */

import React, { memo, useCallback, useEffect } from "react";

/* const ExamplesSelect = (props) => {
} */

const ExamplesSelect = ({
  examples,
  currentExampleKey,
  isValueModified,
  isModifiedValueAvailable,
  showLabels,
  onSelect,
}) => {
  const onHandleSelect = useCallback(
    (key, { isSyntheticChange = false } = {}) => {
      if (typeof onSelect === "function") {
        onSelect(key, {
          isSyntheticChange,
        });
      }
    },
    [onSelect]
  );

  const onDomSelect = (e) => {
    if (typeof onSelect === "function") {
      const element = e.target.selectedOptions[0];
      const key = element.getAttribute("value");

      onHandleSelect(key, {
        isSyntheticChange: false,
      });
    }
  };

  /* getCurrentExample = () => {
    const currentExamplePerProps = examples.get(currentExampleKey);

    const firstExamplesKey = examples.keySeq().first();
    const firstExample = examples.get(firstExamplesKey);

    return currentExamplePerProps || firstExample || Map({});
  }; */

  useEffect(() => {
    // this is the not-so-great part of ExamplesSelect... here we're
    // artificially kicking off an onSelect event in order to set a default
    // value in state. the consumer has the option to avoid this by checking
    // `isSyntheticEvent`, but we should really be doing this in a selector.
    // TODO: clean this up
    // FIXME: should this only trigger if `currentExamplesKey` is nullish?
    //TODO reimagine added check for nullish value
    if (typeof onSelect === "function" && examples?.length > 0) {
      const firstExample = examples.first();
      const firstExampleKey = examples.keyOf(firstExample);

      onHandleSelect(firstExampleKey, {
        isSyntheticChange: true,
      });
    }
  }, [onHandleSelect, examples]);

  return (
    <div className="examples-select">
      {showLabels ? (
        <span className="examples-select__section-label">Examples:</span>
      ) : null}
      <select
        aria-label="Select an example response"
        onChange={onDomSelect}
        value={
          isModifiedValueAvailable && isValueModified
            ? "__MODIFIED__VALUE__"
            : currentExampleKey || ""
        }
      >
        {isModifiedValueAvailable ? (
          <option value="__MODIFIED__VALUE__">[Modified value]</option>
        ) : null}
        {examples?.length > 0 && examples
          .map((example, exampleName) => {
            return (
              <option
                key={exampleName} // for React
                value={exampleName} // for matching to select's `value`
              >
                {example.get("summary") || exampleName}
              </option>
            );
          })
          .valueSeq()}
      </select>
    </div>
  );
};

export default memo(ExamplesSelect);
