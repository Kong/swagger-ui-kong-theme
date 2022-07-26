import { sanitizeUrl as braintreeSanitizeUrl } from "@braintree/sanitize-url"
import Im from "immutable"

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