import { sanitizeUrl as braintreeSanitizeUrl } from "@braintree/sanitize-url"
import Im from "immutable"
import XML from "@kyleshockey/xml"
import memoizee from "memoizee"

// copied from helpers in 'swagger-js', we use this to get the proper id
const toLower = str => String.prototype.toLowerCase.call(str)

export const isImmutable = (maybe) => Im.Iterable.isIterable(maybe)

const primitives = {
  "string": () => "string",
  "string_email": () => "user@example.com",
  "string_date-time": () => new Date().toISOString(),
  "string_date": () => new Date().toISOString().substring(0, 10),
  "string_uuid": () => "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "string_hostname": () => "example.com",
  "string_ipv4": () => "198.51.100.42",
  "string_ipv6": () => "2001:0db8:5b96:0000:0000:426f:8e17:642a",
  "number": () => 0,
  "number_float": () => 0.0,
  "integer": () => 0,
  "boolean": (schema) => typeof schema.default === "boolean" ? schema.default : true
}

export function isFunc(thing) {
  return typeof(thing) === "function"
}

const primitive = (schema) => {
  schema = objectify(schema)
  let { type, format } = schema

  let fn = primitives[`${type}_${format}`] || primitives[type]

  if(isFunc(fn))
    return fn(schema)

  return "Unknown Type: " + schema.type
}


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

/**
 * Returns an Immutable List, safely
 * @param {Immutable.Iterable} iterable the iterable to get the key from
 * @param {String|[String]} key either an array of keys, or a single key
 * @returns {Immutable.List} either iterable.get(keys) or an empty Immutable.List
 */
 export function getList(iterable, keys) {
  if(!Im.Iterable.isIterable(iterable)) {
    return Im.List()
  }
  let val = iterable.getIn(Array.isArray(keys) ? keys : [keys])
  return Im.List.isList(val) ? val : Im.List()
}

export const getExtensions = (defObj) => defObj.filter((v, k) => /^x-/.test(k))
export const getCommonExtensions = (defObj) => defObj.filter((v, k) => /^pattern|maxLength|minLength|maximum|minimum/.test(k))

export function sanitizeUrl(url) {
  if(typeof url !== "string" || url === "") {
    return ""
  }

  return braintreeSanitizeUrl(url)
}


/**
 * Adapted from http://github.com/asvd/microlight
 * @copyright 2016 asvd <heliosframework@gmail.com>
 */
 export function highlight (el) {
  const MAX_LENGTH = 5000
  var
    _document = document,
    appendChild = "appendChild",
    test = "test"

  if (!el) return ""
  if (el.textContent.length > MAX_LENGTH) { return el.textContent }

  var reset = function(el) {
    var text = el.textContent,
      pos = 0, // current position
      next1 = text[0], // next character
      chr = 1, // current character
      prev1, // previous character
      prev2, // the one before the previous
      token = // current token content
        el.innerHTML = "", // (and cleaning the node)

    // current token type:
    //  0: anything else (whitespaces / newlines)
    //  1: operator or brace
    //  2: closing braces (after which '/' is division not regex)
    //  3: (key)word
    //  4: regex
    //  5: string starting with "
    //  6: string starting with '
    //  7: xml comment  <!-- -->
    //  8: multiline comment /* */
    //  9: single-line comment starting with two slashes //
    // 10: single-line comment starting with hash #
      tokenType = 0,

    // kept to determine between regex and division
      lastTokenType,
    // flag determining if token is multi-character
      multichar,
      node

    // running through characters and highlighting
    while (prev2 = prev1,
      // escaping if needed (with except for comments)
      // previous character will not be therefore
      // recognized as a token finalize condition
      prev1 = tokenType < 7 && prev1 == "\\" ? 1 : chr
      ) {
      chr = next1
      next1=text[++pos]
      multichar = token.length > 1

      // checking if current token should be finalized
      if (!chr || // end of content
          // types 9-10 (single-line comments) end with a
          // newline
        (tokenType > 8 && chr == "\n") ||
        [ // finalize conditions for other token types
          // 0: whitespaces
          /\S/[test](chr), // merged together
          // 1: operators
          1, // consist of a single character
          // 2: braces
          1, // consist of a single character
          // 3: (key)word
          !/[$\w]/[test](chr),
          // 4: regex
          (prev1 == "/" || prev1 == "\n") && multichar,
          // 5: string with "
          prev1 == "\"" && multichar,
          // 6: string with '
          prev1 == "'" && multichar,
          // 7: xml comment
          text[pos-4]+prev2+prev1 == "-->",
          // 8: multiline comment
          prev2+prev1 == "*/"
        ][tokenType]
      ) {
        // appending the token to the result
        if (token) {
          // remapping token type into style
          // (some types are highlighted similarly)
          el[appendChild](
            node = _document.createElement("span")
          ).setAttribute("style", [
            // 0: not formatted
            "color: #555; font-weight: bold;",
            // 1: keywords
            "",
            // 2: punctuation
            "",
            // 3: strings and regexps
            "color: #555;",
            // 4: comments
            ""
          ][
            // not formatted
            !tokenType ? 0 :
              // punctuation
              tokenType < 3 ? 2 :
                // comments
                tokenType > 6 ? 4 :
                  // regex and strings
                  tokenType > 3 ? 3 :
                    // otherwise tokenType == 3, (key)word
                    // (1 if regexp matches, 0 otherwise)
                    + /^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/[test](token)
            ])

          node[appendChild](_document.createTextNode(token))
        }

        // saving the previous token type
        // (skipping whitespaces and comments)
        lastTokenType =
          (tokenType && tokenType < 7) ?
            tokenType : lastTokenType

        // initializing a new token
        token = ""

        // determining the new token type (going up the
        // list until matching a token type start
        // condition)
        tokenType = 11
        while (![
          1, //  0: whitespace
                               //  1: operator or braces
          /[\/{}[(\-+*=<>:;|\\.,?!&@~]/[test](chr), // eslint-disable-line no-useless-escape
          /[\])]/[test](chr), //  2: closing brace
          /[$\w]/[test](chr), //  3: (key)word
          chr == "/" && //  4: regex
            // previous token was an
            // opening brace or an
            // operator (otherwise
            // division, not a regex)
          (lastTokenType < 2) &&
            // workaround for xml
            // closing tags
          prev1 != "<",
          chr == "\"", //  5: string with "
          chr == "'", //  6: string with '
                               //  7: xml comment
          chr+next1+text[pos+1]+text[pos+2] == "<!--",
          chr+next1 == "/*", //  8: multiline comment
          chr+next1 == "//", //  9: single-line comment
          chr == "#" // 10: hash-style comment
        ][--tokenType]);
      }

      token += chr
    }
  }

  return reset(el)
}

function makeWindow() {
  var win = {
    location: {},
    history: {},
    open: () => {},
    close: () => {},
    File: function() {}
  }

  if(typeof window === "undefined") {
    return win
  }

  try {
    win = window
    var props = ["File", "Blob", "FormData"]
    for (var prop of props) {
      if (prop in window) {
        win[prop] = window[prop]
      }
    }
  } catch( e ) {
    console.error(e)
  }

  return win
}

export const win = makeWindow()

export function isObject(obj) {
  return !!obj && typeof obj === "object"
}

export function objectify (thing) {
  if(!isObject(thing))
    return {}
  if(isImmutable(thing))
    return thing.toJS()
  return thing
}

// Deeply strips a specific key from an object.
//
// `predicate` can be used to discriminate the stripping further,
// by preserving the key's place in the object based on its value.
export function deeplyStripKey(input, keyToStrip, predicate = () => true) {
  if(typeof input !== "object" || Array.isArray(input) || input === null || !keyToStrip) {
    return input
  }

  const obj = {}

  for (const key of Object.keys(input)) {
    if (input.hasOwnProperty(key)) {
      obj[key] = input[key]
    }
  }

  Object.keys(obj).forEach(k => {
    if(k === keyToStrip && predicate(obj[k], k)) {
      delete obj[k]
      return
    }
    obj[k] = deeplyStripKey(obj[k], keyToStrip, predicate)
  })

  return obj
}

export const sampleFromSchema = (schema, config={}) => {
  let { type, example, properties, additionalProperties, items } = objectify(schema)
  let { includeReadOnly, includeWriteOnly } = config


  if(example !== undefined) {
    return deeplyStripKey(example, "$$ref", (val) => {
      // do a couple of quick sanity tests to ensure the value
      // looks like a $$ref that swagger-client generates.
      return typeof val === "string" && val.indexOf("#") > -1
    })
  }

  if(!type) {
    if(properties) {
      type = "object"
    } else if(items) {
      type = "array"
    } else {
      return
    }
  }

  if(type === "object") {
    let props = objectify(properties)
    let obj = {}
    for (var name in props) {
      if ( props[name] && props[name].deprecated ) {
        continue
      }
      if ( props[name] && props[name].readOnly && !includeReadOnly ) {
        continue
      }
      if ( props[name] && props[name].writeOnly && !includeWriteOnly ) {
        continue
      }
      obj[name] = sampleFromSchema(props[name], config)
    }

    if ( additionalProperties === true ) {
      obj.additionalProp1 = {}
    } else if ( additionalProperties ) {
      let additionalProps = objectify(additionalProperties)
      let additionalPropVal = sampleFromSchema(additionalProps, config)

      for (let i = 1; i < 4; i++) {
        obj["additionalProp" + i] = additionalPropVal
      }
    }
    return obj
  }

  if(type === "array") {
    if(Array.isArray(items.anyOf)) {
      return items.anyOf.map(i => sampleFromSchema(i, config))
    }

    if(Array.isArray(items.oneOf)) {
      return items.oneOf.map(i => sampleFromSchema(i, config))
    }

    return [ sampleFromSchema(items, config) ]
  }

  if(schema["enum"]) {
    if(schema["default"])
      return schema["default"]
    return normalizeArray(schema["enum"])[0]
  }

  if (type === "file") {
    return
  }

  return primitive(schema)
}


export function normalizeArray(arr) {
  if(Array.isArray(arr))
    return arr
  return [arr]
}


export function createXMLExample(schema, config) {
  let json = sampleXmlFromSchema(schema, config)
  if (!json) { return }

  return XML(json, { declaration: true, indent: "\t" })
}

export const memoizedCreateXMLExample = memoizee(createXMLExample)

export const memoizedSampleFromSchema = memoizee(sampleFromSchema)

export const getSampleSchema = (schema, contentType="", config={}) => {
  if (/xml/.test(contentType)) {
    if (!schema.xml || !schema.xml.name) {
      schema.xml = schema.xml || {}

      if (schema.$$ref) {
        let match = schema.$$ref.match(/\S*\/(\S+)$/)
        schema.xml.name = match[1]
      } else if (schema.type || schema.items || schema.properties || schema.additionalProperties) {
        return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!-- XML example cannot be generated; root element name is undefined -->"
      } else {
        return null
      }
    }
    return memoizedCreateXMLExample(schema, config)
  }

  const res = memoizedSampleFromSchema(schema, config)

  return typeof res === "object" ? JSON.stringify(res, null, 2) : res
}

export function numberToString(thing) {
  if(typeof thing === "number") {
    return thing.toString()
  }

  return thing
}

export function stringify(thing) {
  if (typeof thing === "string") {
    return thing
  }

  if (thing && thing.toJS) {
    thing = thing.toJS()
  }

  if (typeof thing === "object" && thing !== null) {
    try {
      return JSON.stringify(thing, null, 2)
    }
    catch (e) {
      return String(thing)
    }
  }

  if(thing === null || thing === undefined) {
    return ""
  }

  return thing.toString()
}

export const isEmptyValue = (value) => {
  if (!value) {
    return true
  }

  if (isImmutable(value) && value.isEmpty()) {
    return true
  }

  return false
}
