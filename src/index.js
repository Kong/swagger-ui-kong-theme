import React from 'react'
import KongLayout from './components/Layout'
import AugmentingInfo from './components/AugmentingInfo.js'
import AugmentingResponses from './components/AugmentingResponses'
import AugmentingOperation from './components/AugmentingOperation.js'
import Sidebar from './components/Sidebar'
import SidebarList from './components/SidebarList'
import ContentType from './components/ContentType'
import ExamplesSelect from './components/ExamplesSelect'
import Models from './components/Models'
import ModelCollapse from './components/ModelCollapse'
import OperationTag from './components/OperationTag'
import FilterContainer from './containers/Filter'
import Operations from './components/Operations'
import ModelExample from './components/ModelExample'
import ModelWrapper from './components/ModelWrapper'
import HighlightCode from './components/HighlightCode'

// Overwriting requires lowercase versions of the react components in swagger-ui
const SwaggerUIKongTheme = (system) => {
  return {
    components: {
      curl: () => null,
      KongLayout: KongLayout,
      Sidebar: Sidebar,
      SidebarList: SidebarList,
      contentType: ContentType,
      ExamplesSelect: ExamplesSelect,
      Models: Models,
      ModelCollapse: ModelCollapse,
      OperationTag: OperationTag,
      FilterContainer: FilterContainer,
      operations: Operations,
      modelExample: ModelExample,
      ModelWrapper: ModelWrapper,
      highlightCode: HighlightCode
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
      operation : (Original, system) => (props) => {
        return (
          <div className='operations-augment-wrapper'>
            <AugmentingOperation {...props} system={system} />
            <Original { ...props}  />
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
