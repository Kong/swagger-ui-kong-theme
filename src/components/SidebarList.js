import React, { Component } from 'react'
import { opId } from '../helpers/helpers'
import styles from './SidebarList.module.css'

export default class SidebarList extends Component {
  state = {
    sidebarData: [],
    filteredSidebarData: [],
    activeTags: [],
    oldTags: [],
    isFiltered: false,
    activeId: null,
    filter: true
  }

  componentDidMount () {
    const taggedOps = this.props.specSelectors.taggedOperations()
    this.setState({
      sidebarData: taggedOps,
      filteredSidebarData: taggedOps
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const filter = this.props.layoutSelectors.currentFilter()
    if (prevState.filter !== filter) {
      this.updatefilteredSidebarData(filter)
    }
  }

  updatefilteredSidebarData (filter) {
    // on a search all tags are active, when the search is removed we go back to old state
    if (!this.state.isFiltered && filter !== '') {
      const newActiveTags = this.state.sidebarData.map((sidebarItem, tag) => tag)

      this.setState({
        oldTags: this.state.activeTags,
        activeTags: newActiveTags,
        isFiltered: true
      })
    } else if (this.state.isFiltered && filter === '') {
      this.setState({
        activeTags: this.state.oldTags,
        isFiltered: false
      })
    }

    const filteredSidebarData = this.props.fn.opsFilter(this.state.sidebarData, filter)

    this.setState({ filter, filteredSidebarData })
  }

  buildSidebarURL (string) {
    return string
      .replace(/\//, '')
      .replace(/({|})/g, '_')
      .replace(/\//g, '_')
      .replace(/-/, '_')
      .replace(/\s/g, '_')
  }

  moveToAnchor (destination) {
    window.scrollTo({ top: destination.offsetTop, behavior: 'smooth' })
  }

  isIdActive (id) {
    return this.state.activeId === id
  }

  isTagActive (tag) {
    return this.state.activeTags.includes(tag)
  }

  ifActive (bool) {
    return bool ? 'active' : ''
  }

  getSidebarAnchorId (op) {
    return op.getIn(['operation', '__originalOperationId']) || op.getIn(['operation', 'operationId']) || opId(op.get('operation'), op.get('path'), op.get('method')) || op.get('id')
  }

  sidebarAnchorClicked (tag, op) {
    // this order is crucial to get the correct id
    const id = this.getSidebarAnchorId(op)

    this.setState({
      activeTags: [...this.state.activeTags, tag],
      activeId: id
    })
    this.props.layoutActions.show(['operations-tag', tag], true)
    this.props.layoutActions.show(['operations', tag, id], true)
    const anchorPath = `operations-${tag}-${id}`
    // this is needed because escaping is inconsistant
    const anchor = document.querySelector(`#${anchorPath}`) || document.querySelector(`#operations-${this.buildSidebarURL(tag)}-${this.buildSidebarURL(id)}`)
    if (anchor) {
      this.moveToAnchor(anchor)
    }
  }

  subMenuClicked (tag) {
    if (this.isTagActive(tag)) {
      this.setState({ activeTags: this.state.activeTags.filter(activeTag => activeTag !== tag) })

      return
    }

    this.setState({ activeTags: [...this.state.activeTags, tag] })
  }

  summaryOrPath (op) {
    return op.getIn(['operation', 'summary']) || op.get('path')
  }

  render () {
    const { title, getComponent } = this.props
    const { filteredSidebarData } = this.state

    const Filter = getComponent('Filter', true)

    return (
      <div id="spec-sidebar-list" className={styles.sidebarList}>
        <div className={styles.sidebarListTitle}>
          {title}
        </div>
        <div className="my-4">
          <Filter />
        </div>
        <ul>
          {filteredSidebarData.map((sidebarItem, tag) =>
            <li key={tag} className={'submenu ' + this.ifActive(this.isTagActive(tag))} >
              <span className="submenu-title d-block cursor-pointer py-1 pl-5 color-text_colors-headings" onClick={() => this.subMenuClicked(tag)}>{tag}</span>
              <ul className="submenu-items pt-1">
                {sidebarItem.get('operations').map((op, index) =>
                  <div key={index}>
                    <li className={'method px-6 pt-2 pb-2 type-sm ' + this.ifActive(this.isIdActive(this.getSidebarAnchorId(op)))} >
                      <span className={'uppercase method-' + op.get('method')}>{op.get('method')}</span>
                      <a onClick={() => this.sidebarAnchorClicked(tag, op)} className={'cursor-pointer method-' + op.get('method')}>
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
