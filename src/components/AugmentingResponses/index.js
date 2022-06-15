import React, { memo, useMemo, useState } from "react";
import { createHar } from "swagger2har";
import { CodeSnippetWidget } from "react-apiembed";

import { defaultLanguages } from "../../constants/languages";

const hashIdx = "_**[]";
const AugmentingResponses = memo(
  ({ system, specSelectors, getConfigs, specPath, path, method }) => {
    const [overlay, setOverlay] = useState("on");
    const config = getConfigs();

    // Duplicate keys are hashed with "[key]_**[][index]"
    // This helper extracts the key from the hashed key
    // see extractKey https://github.com/swagger-api/swagger-ui/blob/master/src/core/plugins/request-snippets/fn.js
    const extractKey = (hashedKey) => {
      return hashedKey.indexOf(hashIdx) < 0
        ? hashedKey
        : hashedKey.split(hashIdx)[0].trim();
    };

    const handleClose = () => {
      setOverlay("");
    };

    const handleCloseKeyUp = (key) => {
      if (key === "Enter") {
        setOverlay("");
      } else {
        return void 0;
      }
    };

    const specPathSegments = specPath.toArray();

    if (specPathSegments?.length > 0 && specPathSegments[3] === "callbacks") {
      return null;
    }

    const mutatedRequest = specSelectors.mutatedRequestFor(path, method);

    const har = useMemo(() => {
      const selectedServer = system.oas3Selectors.selectedServer();
      const spec = specSelectors.specJson().toJS();
      const host = specSelectors.host() || "example.com";
      const scheme = specSelectors.operationScheme() || "http";
      const basePath = specSelectors.basePath() || "";

      const initHar = createHar(
        spec,
        path,
        method,
        selectedServer || `${scheme}://${host}${basePath}`
      );

      if (mutatedRequest) {
        const mutatedRequestJS = specSelectors
          ?.mutatedRequestFor(path, method)
          .toJS();

        // url
        initHar.url = mutatedRequestJS.url;
        initHar.queryString = [];

        // body
        if (mutatedRequestJS.body) {
          initHar.postData = initHar.postData || {};
          try {
            const parsed =
              typeof mutatedRequestJS.body === "string"
                ? JSON.parse(mutatedRequestJS.body)
                : mutatedRequestJS.body;

            initHar.postData.jsonObj = parsed;
            initHar.postData.text = JSON.stringify(parsed);

            initHar.postData.mimeType =
              mutatedRequestJS.headers["Content-Type"];
            if (
              initHar.postData.mimeType === "multipart/form-data" &&
              initHar.postData.jsonObj
            ) {
              initHar.postData.params = Object.keys(
                initHar.postData.jsonObj
              ).map((hashedKey) => {
                const value = initHar.postData.jsonObj[hashedKey];
                const name = extractKey(hashedKey);
                const param = { name };

                if (value instanceof File) {
                  param.fileName = `${value.name};type=${value.type}`;
                } else {
                  param.value = value;
                }
            });

                return param;
              });
            }
          } catch (e) {
            // catch probably means xml
            initHar.postData.jsonObj = undefined;
            // TODO fix clean up
            // this is probably bad practice and will screw over people to want new lines in their xml
            if (typeof mutatedRequestJS.body === "string") {
              initHar.postData.text = mutatedRequestJS.body.replace(
                /\n|\t/g,
                ""
              );
            }
          }
        }

        // headers
        initHar.headers = Object.keys(mutatedRequestJS.headers).map(
          (headerkey) => {
            return {
              name: headerkey,
              value: mutatedRequestJS.headers[headerkey],
            };
          }
        );

        setOverlay("");
      } else {
        // for some reason for scheme host basePath urls we sometimes get function header values instead of string
        // CodeSnippets only wants string headers ¯\_(ツ)_/¯
        initHar?.headers.forEach((header) => {
          if (typeof header.value !== "string") {
            header.value = "";
          }
        });

        // replace '{' '}' delimiters which render escaped in a codesnippet context with ':'
        initHar.url = initHar?.url?.replace(/{/g, ":").replace(/}/g, "");
      }

      return initHar;
    }, [specSelectors, system.oas3Selectors, path, method, mutatedRequest]);

    const languages = useMemo(
      () =>
        config.theme && config.theme.languages
          ? config.theme.languages
          : defaultLanguages,
      [config]
    );

    return (
      <div className={"code-snippet"}>
        {!mutatedRequest && (
          <div className={`overlay ${overlay}`}>
            <span
              aria-label="close"
              role="button"
              className="close"
              onKeyUp={({ key }) => handleCloseKeyUp(key)}
              onClick={() => handleClose()}
            >
              x
            </span>
            <p>Use 'Try it Out' to see completed code snippet</p>
          </div>
        )}
        <CodeSnippetWidget har={har} snippets={languages} />
      </div>
    );
  }
);

const responsesWrapper = (Original, system) => (props) => {
  return (
    <div className={styles.rightSideWrapper}>
      <AugmentingResponses {...props} system={system} />
      <Original {...props} />
    </div>
  );
};

export default responsesWrapper;
