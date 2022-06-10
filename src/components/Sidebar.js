import React, {useState} from "react"

const Sidebar = (props) => {

  const {getConfigs} = props;

  const [sideBarOpen, setSideBarOpen] = useState('');

  const handleToggleSidebar = () => {
    const value = sideBarOpen === 'open' ? 'close' : 'open';
    setSideBarOpen(value);
  }

  const handleKeyToggleSidebar = (e) => {
    if (e) {
      const {code} = e;
      if (code && ['Space', 'Enter', 'Return'].includes(code)) {
        handleToggleSidebar();
      }
    }
  }

  const sidebarToggleText = () => {
    return `${sideBarOpen === "open" ? "Close" : "Open"} Sidebar`
  }

  const config = getConfigs();
  const swaggerAbsoluteTop = {
    top: config.theme && config.theme?.swaggerAbsoluteTop || '0'
  }

  const {getComponent} = this.props
  const SidebarList = getComponent("SidebarList", true)

  return (
      <div>
        <div className="sidebar-toggle" role="button" style={swaggerAbsoluteTop} onClick={handleToggleSidebar}
             onKeyUp={handleKeyToggleSidebar}>
          <p>{sidebarToggleText}</p>
        </div>
        <div className={`overlay ${sideBarOpen}`}/>
        <div id="sidebar" className={sideBarOpen}>
          <div className="sidebar-menu" style={swaggerAbsoluteTop}>
            <SidebarList title="Resources"/>
          </div>
        </div>
      </div>
  )
}

export default Sidebar;
