import React from "react"
import curlToHar from "curl-to-har"
import { createHar } from "swagger2har"
import { CodeSnippetWidget } from 'react-apiembed'

function curl( request ){
  let curlified = []
  let type = ""
  let headers = request.get("headers")
  curlified.push( "curl" )
  curlified.push( "-X", request.get("method") )
  curlified.push( `"${request.get("url")}"`)

  if ( headers && headers.size ) {
    for( let p of request.get("headers").entries() ){
      let [ h,v ] = p
      type = v
      curlified.push( "-H " )
      curlified.push( `"${h}: ${v}"` )
    }
  }

  if ( request.get("body") ){

    if(type === "multipart/form-data" && request.get("method") === "POST") {
      for( let [ k,v ] of request.get("body").entrySeq()) {
        curlified.push( "-F" )
        if (v instanceof win.File) {
          curlified.push( `"${k}=@${v.name}${v.type ? `;type=${v.type}` : ""}"` )
        } else {
          curlified.push( `"${k}=${v}"` )
        }
      }
    } else {
      curlified.push( "-d" )
      curlified.push( JSON.stringify( request.get("body") ).replace(/\\n/g, "") )
    }
  }

  return curlified.join( " " )
}

export default class AugmentingResponses extends React.Component {
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
    console.log('mutated', mutatedRequest)

    let har = createHar(spec, path, method, selectedServer || `${scheme}://${host}${basePath}`)
    har.headers.forEach(header => {
      if (typeof header.value === 'function') {
        header.value = 'poo'
      }
    })
    console.log('har', har)


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
