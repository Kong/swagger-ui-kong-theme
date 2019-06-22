import React from 'react'
import style from './styles.css'
import KongLayout from './components/Layout'
import AugmentingResponses from './components/AugmentingResponses'
import Sidebar from './components/Sidebar'
import SidebarList from './components/SidebarList'


const SwaggerUIKongTheme = (system) => {
  return {
    components: {
      curl: () => null,
      KongLayout: KongLayout,
      Sidebar: Sidebar,
      SidebarList: SidebarList
    },
    wrapComponents: {
      responses: (Original, system) => (props) => {
        return (
          <div className="right-side-wrapper">
            <AugmentingResponses {...props} system={system} />
            <Original { ...props} />
          </div>
        )
      },
      jsonschema_string : (Original, system) => (props) => {
        return (
            <Original { ...props} />
        )
      }
    }
  }
}


exports.KongLayout = KongLayout
exports.SwaggerUIKongTheme = SwaggerUIKongTheme