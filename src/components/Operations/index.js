/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/operations.jsx
 * @prettier
 */

import React from "react"
import PropTypes from "prop-types"
import Im from "immutable"

const SWAGGER2_OPERATION_METHODS = [
  "get", "put", "post", "delete", "options", "head", "patch"
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(["trace"])

const Operations = (props) => {
  const {
    specSelectors, getComponent,
    layoutSelectors, layoutActions, getConfigs, fn
  } = props;

  let taggedOps = specSelectors.taggedOperations()

  const OperationContainer = getComponent("OperationContainer", true)
  const OperationTag = getComponent("OperationTag")

  let {
    maxDisplayedTags,
  } = getConfigs()

  let filter = layoutSelectors.currentFilter()

  if (filter) {
    if (filter !== true) {
      taggedOps = fn.opsFilter(taggedOps, filter)
    }
  }

  if (maxDisplayedTags && !isNaN(maxDisplayedTags) && maxDisplayedTags >= 0) {
    taggedOps = taggedOps.slice(0, maxDisplayedTags)
  }

  return (
      <div>
        {
          taggedOps.length > 0 && taggedOps.map((tagObj, tag) => {
            const operations = tagObj.get("operations")
            return (
                <OperationTag
                    key={"operation-" + tag}
                    tagObj={tagObj}
                    tag={tag}
                    layoutSelectors={layoutSelectors}
                    layoutActions={layoutActions}
                    getConfigs={getConfigs}
                    getComponent={getComponent}>
                  {
                    operations.map(op => {
                      const path = op.get("path")
                      const method = op.get("method")
                      const specPath = Im.List(["paths", path, method])


                      // FIXME: (someday) this logic should probably be in a selector,
                      // but doing so would require further opening up
                      // selectors to the plugin system, to allow for dynamic
                      // overriding of low-level selectors that other selectors
                      // rely on. --KS, 12/17
                      const validMethods = specSelectors.isOAS3() ?
                          OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

                      if (validMethods.indexOf(method) === -1) {
                        return null
                      }

                      return <OperationContainer
                          key={`${path}-${method}`}
                          specPath={specPath}
                          op={op}
                          path={path}
                          method={method}
                          tag={tag}
                      />
                    }).toArray()
                  }


                </OperationTag>
            )
          }).toArray()
        }

        {taggedOps.size < 1 ? <h3 aria-live="assertive"> No operations defined in spec! </h3> : null}
      </div>
  )
}


Operations.propTypes = {
  layoutActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired
}

export default Operations;
