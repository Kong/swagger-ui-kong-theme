
export default function ({ getComponent }) {
  const SidebarList = getComponent("SidebarList", true)
  return (
    <div>
      <div className="sidebar-toggle">
        <p>Open Sidebar</p>
      </div>

      <div id="sidebar">
        <div className="sidebar-menu">
          <div className="sidebar-list">
            <ul>
              <li className="list-title">Getting Started</li>
              <li><a href="{{config.PORTAL_GUI_URL}}/guides">Introduction</a></li>
            </ul>
          </div>
          <SidebarList title="Resources" />
        </div>
      </div>
    </div>
  )
}