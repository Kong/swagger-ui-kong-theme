import React from 'react'
import style from './styles.css'
import KongLayout from './Layout'
import AugmentingResponses from './Responses'
import Sidebar from './Sidebar'
import SidebarList from './SidebarList'


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