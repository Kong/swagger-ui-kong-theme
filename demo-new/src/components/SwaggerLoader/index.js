import React, { useEffect, useState } from "react";

import { loadSwagger } from "../../utils/spec";

import "swagger-ui/dist/swagger-ui.css";
import "./SwaggerLoader.css";

const specs = [
  "/specs/httpbin.yaml",
  "/specs/petstore.json",
  "/specs/uber.json",
  "/specs/generated-spec.json",
];

const SwaggerLoader = () => {
  const [selectedSpec, setSelectedspec] = useState(specs[0]);
  const [ui, setUi] = useState();

  const [hasError, setError] = useState(false);

  useEffect(() => {
    setError(false);
    loadSwagger(selectedSpec).then(setUi)
  }, [selectedSpec]);

  const App = ui?.getComponent("App", "root");

  return (
    <div>
      <div className="btn-panel">
        {hasError && <button onClick={loadSwagger}>Try Again</button>}
        
        <label> Specs: </label>
        <select
          style={{ width: "200px" }}
          value={selectedSpec}
          onChange={(event) => setSelectedspec(event.target.value)}
        >
          {specs.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>
      {App && <App />}
    </div>
  );
};

export default SwaggerLoader;
