import React from 'react'
import style from './styles.css'
import KongLayout from './Layout'
import AugmentingResponses from './Responses'
import JsonSchema_string from './JsonSchemaString'



const SwaggerUIKongTheme = (system) => {
  return {
    wrapComponents: {
      responses: (Original, system) => (props) => {
        return (
          <div className="right-side-wrapper">
            <Original { ...props} />
            <AugmentingResponses {...props} system={system} />
          </div>
        )
      },
      curl : (Original, system) => (props) => {
        return (
          <div>
            <p>{props.request}</p>
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