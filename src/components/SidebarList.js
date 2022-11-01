import React from 'react'
import { opId } from '../helpers/helpers'
export default class SidebarList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarData: [],
      filteredSidebarData: [],
      activeTags: [],
      oldTags: [],
      isFiltered: false,
      activeId: null,
      filter: true,
    }
  }

  componentDidMount() {
    const taggedOps = this.props.specSelectors.taggedOperations()
    this.setState({
      sidebarData: taggedOps,
      filteredSidebarData: taggedOps
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const filter = this.props.layoutSelectors.currentFilter()
    if (prevState.filter !== filter) {
      this.updatefilteredSidebarData(filter)
    }

  }
  updatefilteredSidebarData(filter) {
    // on a search all tags are active, when the search is removed we go back to old state
    if (!this.state.isFiltered && filter !== "") {
      const newActiveTags = this.state.sidebarData.map((sidebarItem, tag) => tag)
      this.setState({
        oldTags: this.state.activeTags,
        activeTags: newActiveTags,
        isFiltered: true
      })
    }
    else if (this.state.isFiltered && filter === "") {
      this.setState({
        activeTags: this.state.oldTags,
        isFiltered: false
      })
    }

    const filteredSidebarData = this.props.fn.opsFilter(this.state.sidebarData, filter)
    this.setState({ filter, filteredSidebarData })
  }

  buildSidebarURL(string) {
    return string
      .replace(/\//, '')
      .replace(/({|})/g, '_')
      .replace(/\//g, '_')
      .replace(/-/, '_')
      .replace(/\s/g, '_')
      .replace(/\./g, '\\.')
  }

  moveToAnchor(destination) {
    window.scrollTo(0, destination.offsetTop - 120)
  }

  isIdActive(id) {
    return this.state.activeId === id
  }

  isTagActive(tag) {
    return this.state.activeTags.includes(tag)
  }

  ifActive(bool) {
    return bool ? " active" : ""
  }


  sidebarAnchorClicked(tag, op) {
    this.sidebarAnchorSelected(tag, op)
  }

  sidebarAnchorKeyup(key, tag, op) {
    if (key === 'Enter' || key === ' ') {
      this.sidebarAnchorSelected(tag, op)
    }
  }

  sidebarAnchorSelected(tag, op) {
    let id = getOperationId(op)
    this.setState({
      activeTags: [...this.state.activeTags, tag],
      activeId: id
    })
    this.props.layoutActions.show(["operations-tag", tag], true)
    this.props.layoutActions.show(["operations", tag, id], true)
    let anchorPath = `operations-${tag}-${id}`
    let encodedPath = `operations-${this.buildSidebarURL(tag)}-${this.buildSidebarURL(id)}`
    // this is needed because escaping is inconsistent
    let anchor = document.getElementById(anchorPath) || document.getElementById(encodedPath)

    if (anchor) {
      anchor.focus()
      this.moveToAnchor(anchor)
    }
  }

  removeFromActiveTags(tag) {
    this.setState({ activeTags: this.state.activeTags.filter(activeTag => activeTag !== tag) })
  }

  addToActiveTags(tag) {
    this.setState({ activeTags: [...this.state.activeTags, tag] })
  }

  toggleActiveTags(tag) {
    if (this.isTagActive(tag)) {
      this.removeFromActiveTags(tag)
    } else {
      this.addToActiveTags(tag)
    }
  }

  subMenuClicked(tag) {
    this.toggleActiveTags(tag)
  }

  subMenuKeyup(key, tag) {
    switch (key) {
      case 'Enter':
        this.toggleActiveTags(tag)
        break;
      case 'ArrowRight':
        !this.isTagActive(tag) && this.addToActiveTags(tag)
        break;
      case 'ArrowLeft':
        this.isTagActive(tag) && this.removeFromActiveTags(tag)
        break;
    }
  }

  summaryOrPath(op) {
    return op.getIn(['operation', 'summary']) || op.get("path")
  }

  getActiveClass(op) {
    return this.ifActive(this.isIdActive(getOperationId(op)))
  }

  render() {
    const FilterContainer = this.props.getComponent("FilterContainer", true)

    return (
      <div className="spec sidebar-list" id="spec-sidebar-list">
        <ul>
          <li role="none" className="spec list-title">Resources</li>
          <li role="none"><FilterContainer /></li>
          {this.state.filteredSidebarData.map((sidebarItem, tag) =>
            <li className={"submenu" + this.ifActive(this.isTagActive(tag))} >
              <span
                role="button"
                aria-expanded={this.isTagActive(tag)}
                aria-label={this.isTagActive(tag) ? `Collapse ${tag} section` : `Expand ${tag} section`}
                className="submenu-title" tabIndex={0}
                onClick={() => this.subMenuClicked(tag)}
                onKeyUp={(e) => this.subMenuKeyup(e.key, tag)}
              >
                {tag}
              </span>
              <ul className="submenu-items" hidden={!this.isTagActive(tag)}>
                {sidebarItem.get("operations").map(op =>
                  <li className={"method" + this.getActiveClass(op)}>
                    <div 
                      role="button"
                      className="method-button-wrapper"
                      tabIndex={this.isTagActive(tag) ? 0 : -1}
                      onKeyUp={(e) => this.sidebarAnchorKeyup(e.key, tag, op)}
                      onClick={() => this.sidebarAnchorClicked(tag, op)}
                    >
                      <span className={"method-tag method-tag-"+op.get("method")}>{op.get("method")}</span>
                      <a
                        className={"method-" + op.get("method")}
                        role="none"
                      >
                        {this.summaryOrPath(op)}
                      </a>
                    </div>
                  </li>
                )}

              </ul>
            </li>)}

        </ul>
      </div>
    )
  }
}

function getOperationId(op) {
  // this order is crucial to get the correct id
  return op.getIn(["operation", "__originalOperationId"]) || op.getIn(["operation", "operationId"]) || opId(op.get("operation"), op.get("path"), op.get('method')) || op.get("id")
}
