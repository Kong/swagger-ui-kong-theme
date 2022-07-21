import React from "react";
import InfoAlert from "components/InfoAlert";

function Fallback({ name, message, onRetry }) {
  console.log("retry function", onRetry);
  return (
    <div className="fallback">
      <InfoAlert
        msg={`Error in ${name} component with this error message: ${message}{" "}`}
      />
      <button onClick={onRetry || (() => window.location.reload())}>Retry</button>
    </div>
  );
}

export default Fallback;
