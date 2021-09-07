import React from "react"
import { get } from "http";

export default class Sidebar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: ""
    };
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)

  }

  handleToggleSidebar() {
    this.state.sidebarOpen === "open" ?
      this.setState({sidebarOpen: "close"}) :
      this.setState({sidebarOpen: "open"})
  }

  handleKeyToggleSidebar(e) {
    console.log({e});
    if (e && e.code && ['Space', 'Enter', 'Return'].includes(e.code)) {
      this.handleToggleSidebar()
    }
  }

  sidebarToggleText() {
    return `${this.state.sidebarOpen === "open" ? "Close" : "Open"} Sidebar`
  }

  render() {
    const config = this.props.getConfigs()
    const swaggerAbsoluteTop = {
      top: config.theme && config.theme.swaggerAbsoluteTop || '0'
    }

    const { getComponent } = this.props
    const SidebarList = getComponent("SidebarList", true)

    return (
      <div>
        <button tabIndex="0" className="sidebar-toggle" style={swaggerAbsoluteTop} onClick={this.handleToggleSidebar} onKeyUp={this.handleKeyToggleSidebar} >
          {this.sidebarToggleText()}
        </button>
        <div className={"overlay " + this.state.sidebarOpen}></div>
        <div id="sidebar" className={this.state.sidebarOpen}>
          <div className="sidebar-menu" style={swaggerAbsoluteTop}>
            <SidebarList title="Resources" />
          </div>
        </div>
      </div>
    )
  }
}

