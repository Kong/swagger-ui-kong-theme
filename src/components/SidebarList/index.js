import React, { useMemo, useState } from "react";
import { opId } from "helpers/helpers";
import styles from "./styles.module.css";

const SidebarList = ({
  specSelectors,
  layoutSelectors,
  fn,
  layoutActions,
  getComponent,
}) => {
  const [activeTags, setActiveTags] = useState([]);
  const [oldTags, setOldTags] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const currentFilter = layoutSelectors.currentFilter();

  const filteredSidebarData = useMemo(() => {
    const sidebarData = specSelectors.taggedOperations();

    // on a search all tags are active, when the search is removed we go back to old state
    if (typeof currentFilter === "string") {
      debugger;
      if (currentFilter !== "") {
        debugger;
        const newActiveTags = sidebarData.map((sidebarItem, tag) => tag);
        setOldTags(activeTags);
        setActiveTags(newActiveTags);
      } else {
        debugger;
        setActiveTags(oldTags);
      }

      return fn.opsFilter(sidebarData, currentFilter);
    } else {
      return sidebarData;
    }
  }, [currentFilter, specSelectors]);

  const buildSidebarURL = (stringValue) => {
    return stringValue
      .replace(/\//, "")
      .replace(/([{|}])/g, "_")
      .replace(/\//g, "_")
      .replace(/-/, "_")
      .replace(/\s/g, "_")
      .replace(/\./g, "\\.");
  };

  const moveToAnchor = (destination) => {
    window.scrollTo(0, destination.offsetTop - 120);
  };

  const isIdActive = (id) => {
    return activeId === id;
  };

  const isTagActive = (tag) => {
    return activeTags.includes(tag);
  };

  const isActive = (boolValue) => {
    return boolValue ? styles.active : "";
  };

  const sideBarAnchorClicked = (tag, op) => {
    sideBarAnchorSelected(tag, op);
  };

  const sideBarAnchorKeyUp = (key, tag, op) => {
    if (key === "Enter") {
      sideBarAnchorSelected(tag, op);
    }
  };

  const sideBarAnchorSelected = (tag, op) => {
    let id = getOperationId(op);
    setActiveTags([...activeTags, tag]);
    setActiveId(id);
    layoutActions.show(["operations-tag", tag], true);
    layoutActions.show(["operations", tag, id], true);
    let anchorPath = `operations-${tag}-${id}`;
    let encodedPath = `operations-${buildSidebarURL(tag)}-${buildSidebarURL(
      id
    )}`;
    // this is needed because escaping is inconsistent
    let anchor =
      document.getElementById(anchorPath) ||
      document.getElementById(encodedPath);

    if (anchor) {
      moveToAnchor(anchor);
    }
  };

  const removeFromActiveTags = (tag) => {
    const newActiveTags = activeTags.filter((aT) => aT !== tag);
    setActiveTags(newActiveTags);
  };

  const addToActiveTags = (tag) => {
    const newActiveTags = [...activeTags, tag];
    setActiveTags(newActiveTags);
  };

  const toggleActiveTags = (tag) => {
    if (isTagActive(tag)) {
      removeFromActiveTags(tag);
    } else {
      addToActiveTags(tag);
    }
  };

  const subMenuClicked = (tag) => {
    toggleActiveTags(tag);
  };

  const subMenuKeyup = (key, tag) => {
    switch (key) {
      case "Enter":
        toggleActiveTags(tag);
        break;
      case "ArrowRight":
        !isTagActive(tag) && addToActiveTags(tag);
        break;
      case "ArrowLeft":
        isTagActive(tag) && removeFromActiveTags(tag);
        break;
    }
  };

  const summaryOrPath = (op) => {
    return op.getIn(["operation", "summary"]) || op.get("path");
  };

  const getActiveClass = (op) => {
    return isActive(isIdActive(getOperationId(op)));
  };

  const FilterContainer = getComponent("FilterContainer", true);

  return (
    <div className={`spec ${styles.sidebarList}`} id="spec-sidebar-list">
      <ul>
        <li role="none" className={`spec ${styles.listTitle}`}>
          Resources
        </li>
        <li role="none">
          <FilterContainer />
        </li>
        {filteredSidebarData
          .map((sidebarItem, tag) => (
            <li
              key={tag}
              className={`${styles.submenu} ${isActive(isTagActive(tag))}`}
            >
              <span
                role="button"
                className={styles.submenuTitle}
                tabIndex={0}
                onClick={() => subMenuClicked(tag)}
                onKeyUp={({ key }) => subMenuKeyup(key, tag)}
              >
                {tag}
              </span>
              <ul className={styles.submenuItems} hidden={!isTagActive(tag)}>
                {sidebarItem.get("operations").map((op) => (
                  <li
                    key={getOperationId(op)}
                    className={`${styles.method} ${getActiveClass(op)}`}
                  >
                    <div
                      role="button"
                      className={styles.methodButtonWrapper}
                      tabIndex={isTagActive(tag) ? 0 : -1}
                      onKeyUp={({ key }) => sideBarAnchorKeyUp(key, tag, op)}
                      onClick={() => sideBarAnchorClicked(tag, op)}
                    >
                      <span
                        className={"method-tag method-tag-" + op.get("method")}
                      >
                        {op.get("method")}
                      </span>
                      <a className={"method-" + op.get("method")} role="none">
                        {summaryOrPath(op)}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))
          .toArray()}
      </ul>
    </div>
  );
};

function getOperationId(op) {
  // this order is crucial to get the correct id
  return (
    op.getIn(["operation", "__originalOperationId"]) ||
    op.getIn(["operation", "operationId"]) ||
    opId(op.get("operation"), op.get("path"), op.get("method")) ||
    op.get("id")
  );
}

export default SidebarList;
