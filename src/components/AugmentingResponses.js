import React from "react"
import { createHar } from "swagger2har"
import { CodeSnippetWidget } from 'react-apiembed'

import { toAbsoluteUrl } from '../helpers/helpers'

const hashIdx = "_**[]"
export default class AugmentingResponses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: 'on'
    }
  }

  // Duplicate keys are hashed with "[key]_**[][index]"
  // This helper extracts the key from the hashed key
  // see extractKey https://github.com/swagger-api/swagger-ui/blob/master/src/core/plugins/request-snippets/fn.js
  extractKey(hashedKey) {
    if (hashedKey.indexOf(hashIdx) < 0) {
      return hashedKey
    }
    return hashedKey.split(hashIdx)[0].trim()
  }

  shouldComponentUpdate(nextProps, nextState) {
    // BUG: props.tryItOutResponse is always coming back as a new Immutable instance
    let render = this.props.tryItOutResponse !== nextProps.tryItOutResponse
    || this.props.responses !== nextProps.responses
    || this.props.produces !== nextProps.produces
    || this.props.producesValue !== nextProps.producesValue
    || this.props.displayRequestDuration !== nextProps.displayRequestDuration
    || this.props.path !== nextProps.path
    || this.props.method !== nextProps.method
    || this.state.overlay !== nextState.overlay
    return render
  }

  handleClose() {
    this.setState({overlay: ""})
  }

  handleCloseKeyup(key) {
    switch (key) {
      case 'Enter':
        this.setState({overlay: ""})
      default:
        return void 0;
    }
  }

  render() {
    const {
      system,
      specSelectors,
      path,
      method,
      getConfigs
    } = this.props

    const specPathSegments = this.props.specPath.toArray()
    const isCallback = specPathSegments && specPathSegments.length && specPathSegments[3] === 'callbacks'

    if (isCallback) {
      return null
    }

    let baseURL = ""
    if (specSelectors.isOAS3()) {
      const selectedServer = system.oas3Selectors.selectedServer()
      const specUrl = specSelectors.url()
      try {
        baseURL = toAbsoluteUrl(selectedServer, specUrl)
      } catch { // failed to get window location, most likely in iframe preview
        baseURL = 'http://example.com'
      }
      if (path.startsWith('/') && baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, -1)  // workaround for swagger2har path concatenate bug
      }
    } else {
      const scheme = specSelectors.operationScheme() || 'http'
      const host = specSelectors.host() || 'example.com'
      const basePath = specSelectors.basePath() || ''
      baseURL = `${scheme}://${host}${basePath}`
    }

    const spec = specSelectors.specJson().toJS()
    let har = createHar(spec, path, method, baseURL)

    const mutatedRequest = specSelectors.mutatedRequestFor(path, method)
    if (mutatedRequest) {
      let mutatedRequest = specSelectors.mutatedRequestFor(path, method)
      mutatedRequest = mutatedRequest.toJS()

      // url
      har.url = mutatedRequest.url
      har.queryString = []

      // body
      if (mutatedRequest.body) {
        har.postData = har.postData || {}
        try {
          const parsed = typeof mutatedRequest.body === "string" ?
            JSON.parse(mutatedRequest.body) :
            mutatedRequest.body

          har.postData.jsonObj = parsed
          har.postData.text = JSON.stringify(parsed)

          har.postData.mimeType = mutatedRequest.headers['Content-Type']
          if (har.postData.mimeType === 'multipart/form-data' && har.postData.jsonObj) {
            har.postData.params = Object.keys(har.postData.jsonObj).map(hashedKey => {
              const value = har.postData.jsonObj[hashedKey]
              const name = this.extractKey(hashedKey)
              const param = { name }

              if (value instanceof File) {
                param.fileName = `${value.name};type=${value.type}`
              } else {
                param.value = value
              }

              return param
            })
          }

        } catch(e) {
          // catch probably means xml
          har.postData.jsonObj = undefined
          // TODO fix clean up
          // this is probably bad practice and will screw over people to want new lines in their xml
          if (typeof mutatedRequest.body === 'string') {
            har.postData.text = mutatedRequest.body.replace(/\n|\t/g, '')
          }
        }
      }

      // headers
      har.headers = Object.keys(mutatedRequest.headers).map(headerkey => {
        return {
          name : headerkey,
          value: mutatedRequest.headers[headerkey]
        }
      })

      this.setState({overlay: ''})

    } else {
      // for some reason for scheme host basePath urls we sometimes get function header values instead of string
      // CodeSnippets only wants string headers ¯\_(ツ)_/¯
      har.headers.forEach(header => {
        if (typeof header.value !== 'string') {
          header.value = ''
        }
      })

      // replace '{' '}' delimiters which render escaped in a codesnippet context with ':'
      har.url = har.url.replace(/{/g, ":").replace(/}/g, "")
    }

    let languages
    const config = getConfigs()

    if (config.theme && config.theme.languages) {
      languages = config.theme.languages
    } else {
      languages = [
        {
          prismLanguage: 'bash',
          target: 'shell',
          client: 'curl'
        },
        {
          prismLanguage: 'javascript',
          target: 'javascript',
          client: 'xhr'
        },
        {
          prismLanguage: 'python',
          target: 'python'
        },{
          prismLanguage: 'ruby',
          target: 'ruby'
        }
      ]
    }

    return (
      <div className={'code-snippet'}>
         { !mutatedRequest &&
          <div className={`overlay ${this.state.overlay}`}>
            <span aria-label="close" role="button" className='close' onKeyUp={(e) => handleCloseKeyup(e.key)} onClick={() => this.handleClose()}>x</span>
            <p>Use 'Try it Out' to see completed code snippet</p>
          </div>
          }
          <CodeSnippetWidget har={har} snippets={languages}/>
      </div>
    )
  }
}
