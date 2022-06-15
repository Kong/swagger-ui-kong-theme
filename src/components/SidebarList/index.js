import React, { useEffect, useState } from "react";
import { opId } from "helpers/helpers";
import styles from './styles.module.css';
const SidebarList = (props) => {
  const { specSelectors, layoutSelectors, fn, layoutActions, getComponent } =
    props;
  //state
  const [sideBarData, setSideBarData] = useState([]);
  const [filteredSideBarData, setFilteredSideBarData] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [oldTags, setOldTags] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    return () => {
      const taggedOps = specSelectors.taggedOperations();
      setSideBarData(taggedOps);
      setFilteredSideBarData(taggedOps);
    };
  }, []);

  useEffect(() => {
    return () => {
      const currentFilter = layoutSelectors.currentFilter();
      updateFilteredSidebarData(currentFilter);
    };
  }, [filter]);

  const updateFilteredSidebarData = (filterValue) => {
    // on a search all tags are active, when the search is removed we go back to old state
    if (!isFiltered && filterValue !== "") {
      const newActiveTags = sideBarData.map((sidebarItem, tag) => tag);
      setOldTags(activeTags);
      setActiveTags(newActiveTags);
      setIsFiltered(true);
    } else if (isFiltered && filterValue === "") {
      setActiveTags(oldTags);
      setIsFiltered(false);
    }
    const filteredSidebarData = fn.opsFilter(sidebarData, filter);
    setFilter(filter);
    setFilteredSideBarData(filteredSidebarData);
  };
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
    return boolValue ? "active" : "";
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
    <div className="spec sidebar-list" id="spec-sidebar-list">
      <ul>
        <li role="none" className="spec list-title">
          Resources
        </li>
        <li role="none">
          <FilterContainer />
        </li>
        {filteredSideBarData.map((sidebarItem, tag) => (
          <li className={`submenu ${isActive(isTagActive(tag))}`}>
            <span
              role="button"
              className="submenu-title"
              tabIndex={0}
              onClick={() => subMenuClicked(tag)}
              onKeyUp={({ key }) => subMenuKeyup(key, tag)}
            >
              {tag}
            </span>
            <ul className="submenu-items" hidden={!isTagActive(tag)}>
              {sidebarItem.get("operations").map((op) => (
                <li className={`method ${getActiveClass(op)}`}>
                  <div
                    role="button"
                    className="method-button-wrapper"
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
        ))}
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
