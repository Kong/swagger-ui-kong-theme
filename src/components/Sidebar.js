import classNames from 'classnames'
import React, { Component } from 'react'
import { overrideScrollPositionForSelector } from '../helpers/helpers'
import styles from './Sidebar.module.css'

export default class Sidebar extends Component {
  state = {
    sidebarOpen: false
  }

  handleToggleSidebar = () => {
    this.setState((state) => ({
      sidebarOpen: !state.sidebarOpen
    }))
  }

  sidebarToggleText () {
    return `${this.state.sidebarOpen === 'open' ? 'Close' : 'Open'} Sidebar`
  }

  componentDidMount () {
    const tocDiv = document.querySelector('.toc-content')
    const config = this.props.getConfigs()

    if (!config.theme && config.theme.serviceToc || !tocDiv) {
      return
    }

    tocDiv.innerHTML = config.theme.serviceToc

    overrideScrollPositionForSelector('.toc-content a')
  }

  render () {
    const config = this.props.getConfigs()
    const swaggerAbsoluteTop = {
      top: config.theme && config.theme.swaggerAbsoluteTop || '0'
    }
    const serviceToc = config.theme && config.theme.serviceToc

    const { getComponent } = this.props
    const SidebarList = getComponent('SidebarList', true)

    return (
      <div className={classNames(styles.sidebarWrapper, { [styles.sidebarWrapperOpen]: this.state.sidebarOpen })}>
        <a className={styles.sidebarToggle} style={swaggerAbsoluteTop} onClick={this.handleToggleSidebar}>
          <span className={styles.sidebarToggleIcon} />
        </a>
        <div className={classNames(styles.overlay)} />
        <div id="sidebar" className={classNames(styles.sidebar)}>
          <div className={classNames(styles.sidebarMenu, "pl-5 pr-1 pt-6")}>
            <label className={serviceToc ? 'toc-title color-text_colors-headings font-bold uppercase text-xs mb-1' : 'd-none'}>About</label>
            <div className={serviceToc ? 'toc-content mt-4 mb-5' : 'd-none'} />
            <SidebarList title="Resources" />
          </div>
        </div>
      </div>
    )
  }
}
