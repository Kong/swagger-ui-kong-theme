import React from "react";

function Fallback({ name, message }) {
  return (
    <div className="fallback">
      <h3>
        Error in {name} component with this error message: {message}{" "}
      </h3>
    </div>
  );
}

export default Fallback;
