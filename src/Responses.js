import React from "react"
import { createHar } from "swagger2har"
import { CodeSnippetWidget } from 'react-apiembed'


export default class AugmentingResponses extends React.Component {
  render() {
    const {
      getComponent,
      specSelectors,
      path,
      method
    } = this.props
    const spec = specSelectors.specJson().toJS()

    const scheme = specSelectors.operationScheme()
    const host = specSelectors.host()
    const basePath = specSelectors.basePath()
    const thisSpec = spec.paths[path][method]
    console.log('url', host, basePath)

    const har = createHar(spec, path, method, `${scheme}://${host}${basePath}`)
    console.log('har', har)

    console.log('props', this.props)
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
