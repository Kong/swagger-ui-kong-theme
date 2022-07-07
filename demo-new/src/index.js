import React from "react";
import { render } from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import SwaggerUI from "swagger-ui";
import { SwaggerUIKongTheme } from "swagger-ui-kong-theme";

window.swaggerUIOptions = {
 // dom_id: "#ui-wrapper", // Determine what element to load swagger ui
  docExpansion: "list",
  deepLinking: true, // Enables dynamic deep linking for tags and operations
  filter: true,
  layout: "KongLayout",
  presets: [SwaggerUI.presets.apis],
  plugins: [SwaggerUIKongTheme, SwaggerUI.plugins.DownloadUrl],
  theme: {
    swaggerAbsoluteTop: "0px",
    hasSidebar: true,
    languages: [
      {
        prismLanguage: "bash",
        target: "shell",
        client: "curl",
      },
      {
        prismLanguage: "javascript",
        target: "javascript",
        client: "xhr",
      },
      {
        prismLanguage: "python",
        target: "python",
      },
      {
        prismLanguage: "ruby",
        target: "ruby",
      },
    ],
  },
};

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found. Unable to render");
}

if (root) {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
