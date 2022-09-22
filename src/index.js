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
import DeepLink from './components/DeepLink'
import OperationSummaryPath from './components/OperationSummaryPath'
import Operation from './components/Operation'
import ModelExample from './components/ModelExample'
import ModelWrapper from './components/ModelWrapper'
import HighlightCode from './components/HighlightCode'
import TryItOutButton from './components/TryItOutButton'
import ParameterRow from './components/ParameterRow'
import AuthorizationPopup from './components/auth/authorization-popup'
import AuthorizeBtn from './components/auth/authorize-btn'
import AuthorizeOperationBtn from './components/auth/authorize-operation-btn'
import Collapse from './components/Collapse'

// Overwriting requires lowercase versions of the react components in swagger-ui
const SwaggerUIKongTheme = (system) => {
  return {
    statePlugins: {
      focusManager: {
        actions: {
          updateLastActivatedButton: (el) => {
            return {
              type: "SET_LAST_ACTIVATED_BUTTON",
              payload: el
            }
          }
        },
        reducers: {
          "SET_LAST_ACTIVATED_BUTTON": (state, action) => {
            return state.set("lastActivatedButton", action.payload)
          }
        },
        selectors: {
          getLastActivatedButton: (state) => state.get("lastActivatedButton")
        },
      },
      auth: {
        wrapActions: {
          showDefinitions: (oriAction, system) => (isShown) => {
            // here, you can hand the value to some function that exists outside of Swagger UI
            if (!isShown) {
              const lastFocusedEl = system.focusManagerSelectors.getLastActivatedButton()
              if (lastFocusedEl) {
                setTimeout(() => {
                  lastFocusedEl.focus();
                }, 10)
              }
            }
            return oriAction(isShown) // don't forget! otherwise, Swagger UI won't update
          }
        }
      }
    },
    components: {
      curl: () => null,
      Collapse: Collapse,
      KongLayout: KongLayout,
      Sidebar: Sidebar,
      SidebarList: SidebarList,
      contentType: ContentType,
      ExamplesSelect: ExamplesSelect,
      Models: Models,
      ModelCollapse: ModelCollapse,
      OperationTag: OperationTag,
      operation: Operation,
      OperationSummaryPath,
      DeepLink,
      FilterContainer: FilterContainer,
      operations: Operations,
      modelExample: ModelExample,
      ModelWrapper: ModelWrapper,
      highlightCode: HighlightCode,
      TryItOutButton: TryItOutButton,
      parameterRow: ParameterRow,
    },
    wrapComponents: {
      authorizeBtn: (Original, system) => (props) => {
        return (
          <AuthorizeBtn {...props} system={system} />
        )
      },
      authorizeOperationBtn: (Original, system) => (props) => {
        return (
          <AuthorizeOperationBtn {...props} system={system} />
        )
      },
      authorizationPopup: (Original, system) => (props) => {
        return (
          <AuthorizationPopup {...props} system={system} />
        )
      },
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
