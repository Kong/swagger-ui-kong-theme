import React from "react";
import InfoAlert from "components/InfoAlert";

function Fallback({ name, message }) {
  return (
    <div className="fallback">
        <InfoAlert msg={`Error in ${name} component with this error message: ${message}{" "}`}/>
    </div>
  );
}

export default Fallback;
