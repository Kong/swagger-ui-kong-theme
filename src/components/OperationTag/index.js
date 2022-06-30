/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/operation-tag.jsx
 * @prettier
 */

import React from "react";
import {
  createDeepLinkPath,
  escapeDeepLinkPath,
  sanitizeUrl,
} from "helpers/helpers";

const OperationTag = (props) => {
  const {
    layoutActions,
    tagObj,
    tag,
    children,
    layoutSelectors,
    getConfigs,
    getComponent,
  } = props;

  const handleKeypress = (event, isShownKey, showTag) => {
    if (
      event.nativeEvent.code === "Enter" ||
      event.nativeEvent.code === "Space"
    ) {
      layoutActions.show(isShownKey, showTag);
    }
  };

  let { docExpansion } = getConfigs();

  const Collapse = getComponent("Collapse");
  const Markdown = getComponent("Markdown");
  const DeepLink = getComponent("DeepLink");
  const Link = getComponent("Link");

  let tagDescription = tagObj.getIn(["tagDetails", "description"], null);
  let tagExternalDocsDescription = tagObj.getIn([
    "tagDetails",
    "externalDocs",
    "description",
  ]);
  let tagExternalDocsUrl = tagObj?.getIn(["tagDetails", "externalDocs", "url"], null);

  let isShownKey = ["operations-tag", tag];
  let showTag = layoutSelectors.isShown(
    isShownKey,
    docExpansion === "full" || docExpansion === "list"
  );

  return (
    <div
      className={
        showTag ? "opblock-tag-section is-open" : "opblock-tag-section"
      }
    >
      <h1
        className={!tagDescription ? "opblock-tag no-desc" : "opblock-tag"}
        id={isShownKey.map((v) => escapeDeepLinkPath(v)).join("-")}
        onClick={() => layoutActions.show(isShownKey, !showTag)}
        onKeyUp={(e) => handleKeypress(e, isShownKey, !showTag)}
        data-tag={tag}
        data-is-open={showTag}
        tabIndex={0}
      >
        <DeepLink
          tabIndex={-1}
          enabled={false} // Set to false, as we don't seem to be doing anything when deeplinking.
          isShown={showTag}
          path={createDeepLinkPath(tag)}
          text={tag}
        />
        {!tagDescription ? (
          <small />
        ) : (
          <small>
            <Markdown source={tagDescription} />
          </small>
        )}

        <div>
          {!tagExternalDocsDescription ? null : (
            <small>
              {tagExternalDocsDescription}
              {tagExternalDocsUrl ? ": " : null}
              {tagExternalDocsUrl ? (
                <Link
                  href={sanitizeUrl(tagExternalDocsUrl)}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                >
                  {tagExternalDocsUrl}
                </Link>
              ) : null}
            </small>
          )}
        </div>

        <button
          className="expand-operation"
          title={showTag ? "Collapse operation" : "Expand operation"}
          onClick={() => layoutActions.show(isShownKey, !showTag)}
          aria-expanded={showTag}
          tabIndex={-1}
        >
          <svg className="arrow" width="20" height="20">
            <use
              href={showTag ? "#large-arrow-down" : "#large-arrow"}
              xlinkHref={showTag ? "#large-arrow-down" : "#large-arrow"}
            />
          </svg>
        </button>
      </h1>
      <Collapse isOpened={showTag}>{children}</Collapse>
    </div>
  );
};

export default OperationTag;
