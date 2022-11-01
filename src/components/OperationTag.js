/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/operation-tag.jsx
 * @prettier
 */

import React from "react"
import { escapeDeepLinkPath, sanitizeUrl } from '../helpers/helpers'

export default class OperationTag extends React.Component {

  render() {
    const {
      tagObj,
      tag,
      children,

      layoutSelectors,
      layoutActions,
      getConfigs,
      getComponent,
    } = this.props

    let { docExpansion } = getConfigs()

    const Collapse = getComponent("Collapse")
    const Markdown = getComponent("Markdown")
    const Link = getComponent("Link")

    let tagDescription = tagObj.getIn(["tagDetails", "description"], null)
    let tagExternalDocsDescription = tagObj.getIn(["tagDetails", "externalDocs", "description"])
    let tagExternalDocsUrl = tagObj.getIn(["tagDetails", "externalDocs", "url"])

    let isShownKey = ["operations-tag", tag]
    let showTag = layoutSelectors.isShown(isShownKey, docExpansion === "full" || docExpansion === "list")

    const opBlockSectionKeyId = isShownKey.map(v => escapeDeepLinkPath(v)).join("-")
    const opBlockSectionCollapseKeyId = opBlockSectionKeyId+'-collapse'
    return (
      <div
        className={showTag ? "opblock-tag-section" : "opblock-tag-section"}
        >
        <button
          type="button"
          aria-expanded={showTag}
          aria-label={showTag ? `Collapse ${tagDescription ? `${tag} (${tagDescription})` : `${tag}`} operation section` :`Expand ${tagDescription ? `${tag} (${tagDescription})` : `${tag}`} operation section`}
          className={'btn opblock-tag-btn ' + (!tagDescription ? "opblock-tag no-desc" : "opblock-tag") }
          id={opBlockSectionKeyId}
          aria-controls={opBlockSectionCollapseKeyId}
          onClick={() => layoutActions.show(isShownKey, !showTag)}
          data-tag={tag}
          data-is-open={showTag}
        >
          <p className="nostyle text-wrapper">
            <span>{tag}</span>
          </p>
          { !tagDescription ? <small></small> :
            <small>
              <Markdown source={tagDescription} />
            </small>
          }


            <div
              className="arrow-wrapper expand-operation"
              title={showTag ? "Collapse operation": "Expand operation"}
              >

              <svg className="arrow" width="20" height="20">
                <use href={showTag ? "#large-arrow-down" : "#large-arrow"} xlinkHref={showTag ? "#large-arrow-down" : "#large-arrow"} />
              </svg>
            </div>
        </button>
        <Collapse labelledBy={opBlockSectionKeyId} id={opBlockSectionCollapseKeyId} isOpened={showTag}>
          {buildExternalDocsLink(tagExternalDocsDescription, tagExternalDocsUrl, Link)}
          {children}
        </Collapse>
      </div>
    )
  }
}
function buildExternalDocsLink(tagExternalDocsDescription, tagExternalDocsUrl, Link) {
  return <p className="text-wrapper">
    {!tagExternalDocsDescription ? null :
      <small>
        {tagExternalDocsDescription}
        {tagExternalDocsUrl ? ": " : null}
        {tagExternalDocsUrl ?
          <Link
            href={sanitizeUrl(tagExternalDocsUrl)}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
          >{tagExternalDocsUrl}</Link> : null}
      </small>}
  </p>
}

