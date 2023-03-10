import React, { Component } from 'react'
import { sanitizeUrl } from '../helpers/helpers'
import { fromJS } from 'immutable'
import styles from "./AugmentingInfo.module.css"

class Path extends Component {
  render () {
    const { host, basePath } = this.props

    return (
      <pre className="base-url">
        [ Base URL: {host}{basePath} ]
      </pre>
    )
  }
}

class Contact extends Component {
  render () {
    const { data } = this.props
    const name = data.get('name') || 'the developer'
    const url = data.get('url')
    const email = data.get('email')

    return (
      <div>
        { url && <div><a href={ sanitizeUrl(url) } target="_blank" rel="noreferrer">{ name } - Website</a></div> }
        { email &&
          <a href={sanitizeUrl(`mailto:${email}`)}>
            { url ? `Send email to ${name}` : `Contact ${name}`}
          </a>
        }
      </div>
    )
  }
}

class License extends Component {
  render () {
    const { license } = this.props
    const name = license.get('name') || 'License'
    const url = license.get('url')

    return (
      <div>
        {
          url ? <a target="_blank" rel="noreferrer" href={ sanitizeUrl(url) }>{ name }</a>
            : <span>{ name }</span>
        }
      </div>
    )
  }
}

export default class Info extends Component {
  componentDidMount () {
    const hash = window.location.hash
    if (!hash || !hash.startsWith('#/doc-')) {
      return
    }

    const destination = document.getElementById(hash.slice(2))
    if (!destination) {
      return
    }

    window.scrollTo({ top: destination.offsetTop, behavior: 'smooth' })
  }

  render () {
    const { info, url, host, basePath, getComponent, externalDocs, system } = this.props
    const version = info.get('version')
    const description = info.get('description')
    const title = info.get('title')
    const termsOfService = info.get('termsOfService')
    const contact = info.get('contact')
    const license = info.get('license')
    const { url: externalDocsUrl, description: externalDocsDescription } = (externalDocs || fromJS({})).toJS()

    const Markdown = getComponent('Markdown')
    const VersionStamp = getComponent('VersionStamp')

    const config = system.getConfigs()
    const serviceDoc = config.theme && config.theme.serviceDoc

    return (
      <div className="info">
        { serviceDoc &&
          <div
            className='service-package-markdown markdown-body'
            dangerouslySetInnerHTML={{ __html: serviceDoc }}>
          </div>
        }

        <div className={styles.specDetailSection}>
          <hgroup className={styles.main}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>
                { title }
              </h2>
              { version && <VersionStamp version={version}></VersionStamp> }
            </div>
            { host || basePath ? <Path host={ host } basePath={ basePath } /> : null }
            { url && <a target="_blank" rel="noreferrer" href={ sanitizeUrl(url) }><span className="url"> { url } </span></a> }
          </hgroup>

          <div className="description">
            <Markdown source={ description } />
          </div>

          <div>
            {
              termsOfService && <div>
                <a target="_blank" rel="noreferrer" href={ sanitizeUrl(termsOfService) }>Terms of service</a>
              </div>
            }

            { contact && contact.size ? <Contact data={ contact } /> : null }
            { license && license.size ? <License license={ license } /> : null }
            { externalDocsUrl
              ? <a target="_blank" rel="noreferrer" href={sanitizeUrl(externalDocsUrl)}>{externalDocsDescription || externalDocsUrl}</a>
              : null }
          </div>
        </div>
      </div>
    )
  }
}
