import React, { useState } from "react";

const Sidebar = (props) => {
  const { getConfigs, getComponent } = props;
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handleKeyToggleSidebar = (e) => {
    if (e) {
      const { code } = e;
      if (code && ["Space", "Enter", "Return"].includes(code)) {
        handleToggleSidebar();
      }
    }
  };

  const sidebarToggleText = () => {
    return `${sideBarOpen ? "Close" : "Open"} Sidebar`;
  };

  const config = getConfigs();
  const swaggerAbsoluteTop = {
    top: (config?.theme && config.theme?.swaggerAbsoluteTop) || "0",
  };

  const SidebarList = getComponent("SidebarList", true);

  return (
    <div>
      <div
        className="sidebar-toggle"
        role="button"
        style={swaggerAbsoluteTop}
        onClick={handleToggleSidebar}
        onKeyDown={handleKeyToggleSidebar}
      >
        <p>{sidebarToggleText()}</p>
      </div>
      <div className={`overlay ${sideBarOpen ? 'open': 'close'}`} />
      <div id="sidebar" className={sideBarOpen ? 'open': 'close'}>
        <div className="sidebar-menu" style={swaggerAbsoluteTop}>
          <SidebarList title="Resources" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
