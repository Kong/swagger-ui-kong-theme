import React from 'react'
import style from './styles.css'
import KongLayout from './Layout'
import AugmentingResponses from './Responses'



const SwaggerUIKongTheme = (system) => {
  return {
    components: {
      curl: () => null,
      KongLayout: KongLayout
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