/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/model-collapse.jsx
 * @prettier
 */

import React, { useEffect, useState } from "react";

export default function ModelCollapse({
  title,
  classes,
  expanded,
  collapsedContent,
  onToggle,
  modelName,
  hideSelfOnExpand,
  children,
}) {
  const [expandedState, setExpanded] = useState(expanded);
  const [collapsedContentState] = useState(
    collapsedContent || ModelCollapse.defaultProps.collapsedContent
  );

  useEffect(() => {
    if (hideSelfOnExpand && expanded) {
      // We just mounted pre-expanded, and we won't be going back..
      // So let's give our parent an `onToggle` call..
      // Since otherwise it will never be called.
      onToggle(modelName, expanded);
    }
  }, [hideSelfOnExpand, expanded, modelName, onToggle]);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  const handleKeypress = (event) => {
    if (
      event.nativeEvent.code === "Enter" ||
      event.nativeEvent.code === "Space"
    ) {
      toggleCollapsed();
    }
  };

  const toggleCollapsed = () => {
    if (onToggle) {
      onToggle(modelName, expandedState);
    }

    setExpanded((prev) => !prev);
  };

  return (
    <div className={classes || ""}>
      {expandedState && hideSelfOnExpand ? (
        children
      ) : (
        <div>
          {title && (
            <div
              role="button"
              aria-pressed={expandedState}
              onClick={toggleCollapsed}
              onKeyUp={handleKeypress}
              tabIndex={0}
              style={{ cursor: "pointer", display: "inline-block" }}
            >
              {title}
            </div>
          )}
          <span onClick={toggleCollapsed} style={{ cursor: "pointer" }}>
            <span
              className={"model-toggle" + (expandedState ? "" : " collapsed")}
            ></span>
          </span>
          {expandedState ? children : collapsedContentState}
        </div>
      )}
    </div>
  );
}
