import React, { useState } from "react";
import styles from "./styles.module.css";


const Sidebar = ({ getConfigs, getComponent }) => {
  const [sidebarOpen, setSidebarOpen] = useState("");

  const handleToggleSidebar = () => {
    const value = sidebarOpen === styles.open ? "" : styles.open;

    setSidebarOpen(value);
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
    return `${sidebarOpen === styles.open ? "Close" : "Open"} Sidebar`;
  };

  const config = getConfigs();

  const swaggerAbsoluteTop = {
    top: (config?.theme && config.theme?.swaggerAbsoluteTop) || "0",
  };

  const SidebarList = getComponent("SidebarList", true);

  return (
    <div className={styles.sidebarWrapper}>
      <div
        className={`${styles.sidebarToggle} ${sidebarOpen}`}
        role="button"
        style={swaggerAbsoluteTop}
        onClick={handleToggleSidebar}
        onKeyDown={handleKeyToggleSidebar}
      >
        <span className={styles.icon}>  </span>
      </div>
      <div className={`${styles.overlay} ${sidebarOpen}`} />
      <div id={styles.sidebar} className={sidebarOpen}>
        <div className={styles.sidebarMenu} style={swaggerAbsoluteTop}>
          <SidebarList title="Resources" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
