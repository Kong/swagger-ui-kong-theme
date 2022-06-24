import React from "react";
import { sanitizeUrl } from "helpers/helpers";
import { fromJS } from "immutable";

const EyeSVG = () => (
  <svg
    width="16px"
    height="9px"
    viewBox="0 0 16 9"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>0DC50B50-D286-4889-B1DA-07E43925811F@1.00x</title>
    <desc>Created with sketchtool.</desc>
    <g id="Portal" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="15.00.-I-find-the-API’s-acmePortalsOne-portal,-and-navigate-to-it.-I-see-that-fooAPI-has-2-versions,-one-that-I-can-register-to-(v1.0)-and-one-that-I-can-not.-I-can-browse-the-spec-documentation-for-both"
        transform="translate(-1288.000000, -250.000000)"
        fill="#808080"
      >
        <g id="icon-view-spec" transform="translate(1276.000000, 235.000000)">
          <path
            d="M16.0132636,19.9997778 C16.0132636,22.2089005 17.8101821,24 20.0264818,24 C22.2427816,24 24.0397001,22.2089005 24.0397001,19.9997778 C24.0397001,19.3316201 23.8753209,18.7017025 23.5846764,18.1480152 C23.598349,18.1550027 23.6120349,18.1619369 23.6257366,18.1688137 C23.8344239,18.2974062 24.0220419,18.4542264 24.216683,18.5890918 C24.6170015,18.8452315 24.9210028,19.1954633 25.2430635,19.4725123 C25.5611111,19.7558342 25.7868546,20.0893385 26.0336675,20.3433872 C26.282487,20.5995269 26.4410092,20.8713486 26.5894982,21.0835786 C26.8854731,21.5101296 27.0700811,21.7516327 27.0700811,21.7516327 L27.10921,21.8039061 C27.2426495,21.9774538 27.4734095,22.0495911 27.6831002,21.9638627 C27.9399462,21.8582704 28.0663625,21.5561301 27.9650288,21.2884903 C27.9650288,21.2884903 27.8506521,20.9842591 27.6208953,20.4531614 C27.5004988,20.1917943 27.3770923,19.85829 27.155362,19.5185129 C26.9376449,19.1797813 26.7440071,18.7511394 26.4129166,18.3716345 C26.0868427,17.9910841 25.771805,17.5310782 25.3132948,17.1683007 C25.0935712,16.9780256 24.8778607,16.7657955 24.6340577,16.5807477 C24.3752051,16.4134728 24.1103327,16.2430615 23.8414471,16.0695138 C23.5795846,15.8802841 23.2655503,15.7788737 22.9675688,15.6356446 C22.6675807,15.4934609 22.3575596,15.3648683 22.0234592,15.3000493 C21.3733179,15.0972285 20.685051,15.0439097 19.996784,15 L18.9683969,15.0888648 C18.62627,15.116047 18.3011993,15.2341848 17.9711121,15.3063221 C17.6370117,15.3700957 17.3289972,15.5049611 17.0280059,15.6440083 C16.7290211,15.7851465 16.4179967,15.8917842 16.1561342,16.0799685 C15.8872486,16.2524707 15.6223762,16.422882 15.3635236,16.5891114 C15.1227305,16.7783412 14.9050134,16.9863893 14.6852897,17.1766645 C14.2257762,17.537351 13.9127452,17.9984024 13.5836613,18.3768618 C13.2555807,18.7542758 13.0418769,19.2017361 12.8211499,19.5467406 C12.5883832,19.9042906 12.4830362,20.2064309 12.3666529,20.4583887 C12.1479325,20.9633498 12.0355624,21.2592172 12.0355624,21.2592172 C11.955298,21.4693563 12.0124864,21.7192232 12.1910746,21.8666342 C12.409795,22.0475001 12.7268392,22.0098633 12.9004109,21.7819512 C12.9004109,21.7819512 13.0900355,21.5320844 13.4010599,21.0835786 C13.5555688,20.8629848 13.734157,20.5597991 13.9739468,20.3245688 C14.2197564,20.0767929 14.432457,19.7673343 14.7515078,19.4808761 C15.0755752,19.205918 15.3785732,18.8535952 15.7808983,18.598501 C15.9745361,18.4636357 16.1651639,18.3099518 16.3718447,18.1771774 C16.408979,18.1586251 16.4459986,18.1396547 16.4829473,18.1203521 C16.1831763,18.6806835 16.0132636,19.320467 16.0132636,19.9997778 Z M21.5347432,19.9998333 C20.7040071,19.9998333 20.0297864,19.327796 20.0297864,18.49975 C20.0297864,17.671704 20.7040071,16.9996666 21.5347432,16.9996666 C22.3654794,16.9996666 23.0397001,17.671704 23.0397001,18.49975 C23.0397001,19.327796 22.3654794,19.9998333 21.5347432,19.9998333 Z"
            id="icn---eye"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const Path = (props) => {
  const { host, basePath } = props;
  return (
    <pre className="base-url">
      [Base Url: {host}{basePath}]
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


export const ViewSpec = () => {
  const handleVieViewSpec = () => {
    if (window.onViewSpecClick) {
      window.onViewSpecClick();
    }
  };

  return (
    <button onClick={handleVieViewSpec}>
      <>
        <EyeSVG />
        View Raw
      </>
    </button>
  );
};

const Info = (props) => {
  const { info, url, basePath, host, getComponent, externalDocs } = props;
  const version = info.get("version");
  const description = info.get("description");
  const title = info.get("title");
  const termsOfService = info.get("termsOfService");
  const contact = info.get("contact");
  const licence = info.get("licence");
  const { url: externalDocsUrl, description: externalDocsDescription } = externalDocs || fromJS({}).toJS();

  const Markdown = getComponent("Markdown");
  const VersionStamp = getComponent("VersionStamp");

  return (
    <div className="info">
      <hgroup className="main">
        <div className="header">
          <h2 className="title">
            {title}
            {version && <VersionStamp version={version} />}
          </h2>
          <ViewSpec />
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
      ) : null}
    </div>
  );
};

export default Info;
