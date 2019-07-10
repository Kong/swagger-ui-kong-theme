// copied from helpers in 'swagger-js', we use this to get the proper id
const toLower = str => String.prototype.toLowerCase.call(str)

const escapeString = (str) => {
  return str.replace(/[^\w]/gi, '_')
}

export function opId(operation, pathName, method = '', { v2OperationIdCompatibilityMode } = {}) {
  if (!operation || typeof operation !== 'object') {
    return null
  }
  const idWithoutWhitespace = (operation.operationId || '').replace(/\s/g, '')
  if (idWithoutWhitespace.length) {
    return escapeString(operation.operationId)
  }
  return idFromPathMethod(pathName, method, { v2OperationIdCompatibilityMode })
}


// Create a generated operationId from pathName + method
export function idFromPathMethod(pathName, method, { v2OperationIdCompatibilityMode } = {}) {
  if (v2OperationIdCompatibilityMode) {
    let res = `${method.toLowerCase()}_${pathName}`
      .replace(/[\s!@#$%^&*()_+=[{\]};:<>|./?,\\'""-]/g, '_')

    res = res || `${pathName.substring(1)}_${method}`

    return res
      .replace(/((_){2,})/g, '_')
      .replace(/^(_)*/g, '')
      .replace(/([_])*$/g, '')
  }
  return `${toLower(method)}${escapeString(pathName)}`
}

// suitable for use in URL fragments
export const createDeepLinkPath = (str) => typeof str == "string" || str instanceof String ? str.trim().replace(/\s/g, "%20") : ""
// suitable for use in CSS classes and ids
export const escapeDeepLinkPath = (str) => window.CSS.escape(createDeepLinkPath(str).replace(/%20/g, "_") )
