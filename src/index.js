import React from 'react'
import KongLayout from './components/Layout'
import Button from './components/Button'
import AugmentingInfo from './components/AugmentingInfo'
import AugmentingResponses from './components/AugmentingResponses'
import AugmentingOperation from './components/AugmentingOperation'
import Sidebar from './components/Sidebar'
import SidebarList from './components/SidebarList'
import Filter from './containers/Filter'
import AuthorizeBtn from './components/AuthorizeBtn'
import './kongponents.scss'
import './index.css'
import './styles/main.scss'

// Overwriting requires lowercase versions of the react components in swagger-ui
const SwaggerUIKongTheme = () => {
  console.log('linked')
  return {
    components: {
      curl: () => null,
      Button,
      Filter,
      KongLayout,
      Sidebar,
      SidebarList,
      authorizeBtn: AuthorizeBtn,
    },
    wrapComponents: {
      responses: (Original, system) => (props) => {
        return (
          <div className="right-side-wrapper">
            {props.tryItOutResponse && <AugmentingResponses {...props} system={system} />}
            <Original { ...props} />
          </div>
        )
      },
      operation : (Original, system) => (props) => {
        return (
          <div className='operations-augment-wrapper'>
            <AugmentingOperation {...props} system={system} />
            <Original { ...props} />
          </div>
        )
      },
      info : (Original, system) => (props) => {
        return (
          <div className='info-augment-wrapper'>
            <AugmentingInfo {...props} system={system} />
          </div>
        )
      }
    }
  }
}

export { SwaggerUIKongTheme, KongLayout }
