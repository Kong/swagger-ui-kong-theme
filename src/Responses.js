import React from "react"
import { createHar } from "swagger2har"
import { CodeSnippetWidget } from 'react-apiembed'


export default class AugmentingResponses extends React.Component {
  shouldComponentUpdate(nextProps) {
    // BUG: props.tryItOutResponse is always coming back as a new Immutable instance
    let render = this.props.tryItOutResponse !== nextProps.tryItOutResponse
    || this.props.responses !== nextProps.responses
    || this.props.produces !== nextProps.produces
    || this.props.producesValue !== nextProps.producesValue
    || this.props.displayRequestDuration !== nextProps.displayRequestDuration
    || this.props.path !== nextProps.path
    || this.props.method !== nextProps.method
    return render
  }

  render() {
    const {
      system,
      specSelectors,
      path,
      method
    } = this.props
    const spec = specSelectors.specJson().toJS()
    const selectedServer = system.oas3Selectors.selectedServer()
    const scheme = specSelectors.operationScheme()
    const host = specSelectors.host()
    const basePath = specSelectors.basePath()

    const mutatedRequest = specSelectors.mutatedRequestFor(path, method)
    let har = createHar(spec, path, method, selectedServer || `${scheme}://${host}${basePath}`)



    if (mutatedRequest) {
      let mutatedRequest = specSelectors.mutatedRequestFor(path, method)
      mutatedRequest = mutatedRequest.toJS()

      // url
      har.url = mutatedRequest.url
      har.queryString = []

      // body
      if (mutatedRequest.body) {
        har.postData = har.postData || {}
        har.postData.jsoObj = JSON.parse(mutatedRequest.body)
        // strip \n
        har.postData.text = JSON.stringify(JSON.parse(mutatedRequest.body))
      }

      // headers
      har.headers = Object.keys(mutatedRequest.headers).map(headerkey => {
        return {
          name : headerkey,
          value: mutatedRequest.headers[headerkey]
        }
      })

    } else {

      // for some reason for scheme host basePath urls we sometimes get function header values instead of string
      // CodeSnippets only wants string headers ¯\_(ツ)_/¯
      har.headers.forEach(header => {
        if (typeof header.value !== 'string') {
          header.value = ''
        }
      })
    }

    const languages = [
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


    return (
      <div>
          <CodeSnippetWidget har={har} snippets={languages}/>
      </div>
    )
  }
}
