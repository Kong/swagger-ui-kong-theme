import React from "react";
import { fromJS } from "immutable";

import { sanitizeUrl } from "helpers/helpers";

import styles from "./styles.module.css";
import InfoAlert from "components/InfoAlert";

export const Path = (props) => {
  const { host, basePath } = props;
  return (
    <pre className="base-url">
      [Base Url: {host}
      {basePath}]
    </pre>
  );
};

export const Contact = (props) => {
  const { data } = props;
  const THE_DEVELOPER = "the developer";
  const name = data.get("name") || THE_DEVELOPER;
  const url = data.get("url");
  const email = data.get("email");

  return (
    <div>
      {url && (
        <div>
          <a href={sanitizeUrl(url)} target="_blank">
            {name} - Website
          </a>
        </div>
      )}
      <a href={sanitizeUrl(`mailto:${email}`)}>
        {url ? `Send email to ${name}` : `Contact ${name}`}
      </a>
    </div>
  );
};

export const Licence = (props) => {
  const { data } = props;

  const LICENCE = "LICENCE";

  const name = data.get("name") || LICENCE;
  const url = data.get("url");

  return (
    <div>
      {url ? (
        <a target="_blank" href={sanitizeUrl(url)}>
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
};

export const ViewSpecBtn = () => {
  const handleVieViewSpec = () => {
    if (window.onViewSpecClick) {
      window.onViewSpecClick();
    }
  };

  return (
    <button disabled={!window.onViewSpecClick} onClick={handleVieViewSpec} className="btn viewSpecBtn">
        View Raw
    </button>
  );
};

export const AugmentingInfo = (props) => {
  const { info, url, basePath, host, getComponent, externalDocs } = props;
  const version = info.get("version");
  const description = info.get("description");
  const title = info.get("title");
  const termsOfService = info.get("termsOfService");
  const contact = info.get("contact");
  const licence = info.get("licence");
  const { url: externalDocsUrl, description: externalDocsDescription } =
    externalDocs || fromJS({}).toJS();

  const Markdown = getComponent("Markdown");
  const VersionStamp = getComponent("VersionStamp");

  return info ? (
    <div className="info">
      <hgroup className="main">
        <div className="header">
          {title ? (
            <>
              <h2 className="title">
                {title}
                {version ? (
                  <VersionStamp version={version} />
                ) : (
                  <InfoAlert msg="Version is missing" />
                )}
              </h2>
            </>
          ) : (
            <InfoAlert msg="Title is missing" />
          )}
        </div>
        {host || basePath ? <Path host={host} basePath={basePath} /> : null}
        {url && (
          <a target="_blank" href={sanitizeUrl(url)}>
            <span className="url">{url}</span>
          </a>
        )}
      </hgroup>

      <div className="description">
        <Markdown source={description} />
      </div>

      {termsOfService && (
        <div>
          <a target="_blank" href={sanitizeUrl(termsOfService)}>
            Terms of service
          </a>
        </div>
      )}

      {contact && contact.size ? <Contact data={contact} /> : null}
      {licence && licence.size ? <Licence data={licence} /> : null}
      {externalDocsUrl ? (
        <a target="_blank" href={sanitizeUrl(externalDocsUrl)}>
          {externalDocsDescription || externalDocsUrl}
        </a>
      ) : (
          console.warn('No externalDocsUrl found!')
      )}
    </div>
  ) : (
      console.warn('Info is missing!')
  );
};

const infoWrapper = (Original, system) => (props) => {
  return (
    <div className={styles.infoAugmentWrapper}>
      <AugmentingInfo {...props} system={system} />
    </div>
  );
};

export default infoWrapper;
