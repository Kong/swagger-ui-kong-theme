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
    return bool ? "active" : ""
  }

  sidebarAnchorClicked(tag, op) {
    // this order is crucial to get the correct id
    let id = op.getIn(["operation", "__originalOperationId"]) || op.getIn(["operation", "operationId"]) || opId(op.get("operation"), op.get("path"), op.get('method')) || op.get("id")
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
      this.moveToAnchor(anchor)
    }
  }

  subMenuClicked(tag) {
    if (this.isTagActive(tag)) {
      this.setState({ activeTags: this.state.activeTags.filter(activeTag => activeTag !== tag) })
      return
    }
    this.setState({ activeTags: [...this.state.activeTags, tag] })
  }

  summaryOrPath(op) {
    return op.getIn(['operation', 'summary']) || op.get("path")
  }

  render() {
    const FilterContainer = this.props.getComponent("FilterContainer", true)

    return (
      <div className="spec sidebar-list" id="spec-sidebar-list">
        <ul>
          <li className="spec list-title">Resources</li>
          <FilterContainer />
          {this.state.filteredSidebarData.map((sidebarItem, tag) =>
            <li className={"submenu " + this.ifActive(this.isTagActive(tag))} >
              <span className="submenu-title" onClick={() => this.subMenuClicked(tag)}>{tag}</span>
              <ul className="submenu-items">
                {sidebarItem.get("operations").map(op =>
                  <div>
                    <li className={"method " + this.ifActive(this.isIdActive(op.get("id")))} >
                      <a onClick={() => this.sidebarAnchorClicked(tag, op)} className={"method-" + op.get("method")}>
                        {this.summaryOrPath(op)}
                      </a>
                    </li>

                  </div>)}

              </ul>
            </li>)}

        </ul>
      </div>
    )
  }
}
