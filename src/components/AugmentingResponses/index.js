import React, {useCallback, useState} from "react"
import { createHar } from "swagger2har"
import { CodeSnippetWidget } from 'react-apiembed'

const hashIdx = "_**[]"
const AugmentingResponses = (props) => {
  const {
    system,
    specSelectors,
    getConfigs,
    //    callback props
    tryItOutResponse,
    responses,
    produces,
    producesValue,
    displayRequestDuration,
    path,
    method
  } = props;

  const [overlay, setOverlay] = useState('on');

  // Duplicate keys are hashed with "[key]_**[][index]"
  // This helper extracts the key from the hashed key
  // see extractKey https://github.com/swagger-api/swagger-ui/blob/master/src/core/plugins/request-snippets/fn.js
  const extractKey = (hashedKey) => {
    return hashedKey.indexOf(hashIdx) < 0 ?
        hashedKey : hashedKey.split(hashIdx)[0].trim();
  }



  const handleClose = () => {
    setOverlay('');
  };

  const handleCloseKeyUp = (key) => {
    if(key === 'Enter'){
      setOverlay('');
    } else {
      return void 0;
    }
  }


  const specPathSegments = this.props.specPath.toArray()

  if(specPathSegments?.length > 0&& specPathSegments[3] === 'callbacks'){
    return null;
  }

  const spec = specSelectors.specJson().toJS()
  const selectedServer = system.oas3Selectors.selectedServer()
  const scheme = specSelectors.operationScheme() || 'http'
  const host = specSelectors.host() || 'example.com'
  const basePath = specSelectors.basePath() || ''

  const mutatedRequest = specSelectors?.mutatedRequestFor(path, method)
  let har = createHar(spec, path, method, selectedServer || `${scheme}://${host}${basePath}`)

  if (mutatedRequest) {
    let mutatedRequest = specSelectors?.mutatedRequestFor(path, method)
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
            const name = extractKey(hashedKey)
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

    setOverlay('');

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


  useCallback(() => {
    return (
        <div className={'code-snippet'}>
          { !mutatedRequest &&
              <div className={`overlay ${overlay}`}>
                <span aria-label="close" role="button" className='close' onKeyUp={({key}) => handleCloseKeyUp(key)} onClick={() => handleClose()}>x</span>
                <p>Use 'Try it Out' to see completed code snippet</p>
              </div>
          }
          <CodeSnippetWidget har={har} snippets={languages}/>
        </div>
    )
  }, [tryItOutResponse, responses, produces, producesValue, displayRequestDuration, path, method, overlay])


}

export default AugmentingResponses;
