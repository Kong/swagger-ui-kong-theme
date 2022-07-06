import React from "react";
import { escapeDeepLinkPath } from "helpers/helpers";

export const AugmentingOperation = ({ response, operation: operationProps }) => {
  const { tag, operationId } = operationProps.toJS();

  const operation = operationProps.getIn(["op"]);
  const responses = operation.get("responses");
  const isShownKey = ["operations", tag, operationId];
  const id = escapeDeepLinkPath(isShownKey.join("-"));

  if (responses && response && response.size > 0) {
    let notDocumented =
      !responses.get(String(response.get("status"))) &&
      !responses.get("default");
    response = response.set("notDocumented", notDocumented);
  }

  const $exampleResponse = window.document.querySelector(
    `#${id} .responses-table:not(.live-responses-table)`
  );

  if ($exampleResponse) {
    $exampleResponse.style.display = response ? "none" : "table";
  }

  return <div className="empty" />;
};

const OperationWrapper =(Original, system) => (props) => {
  return (
    <div className='operations-augment-wrapper'>
      <AugmentingOperation {...props} system={system} />
      <Original { ...props}  />
    </div>
  )
};

export default OperationWrapper;
