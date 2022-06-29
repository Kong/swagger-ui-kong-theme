import React from "react";
import KongLayout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import SidebarList from "./components/SidebarList";
import ContentType from "./components/ContentType";
import ExamplesSelect from "./components/ExamplesSelect";
import Models from "./components/Models";
import ModelCollapse from "./components/ModelCollapse";
import OperationTag from "./components/OperationTag";
import FilterContainer from "./containers/Filter";
import Operations from "./components/Operations";
import ModelExample from "./components/ModelExample";
import ModelWrapper from "./components/ModelWrapper";
import HighlightCode from "./components/HighlightCode";
import TryItOutButton, { tryItOutWrapper } from "./components/TryItOutButton";
import ErrorBoundary from "./components/ErrorBoundary";

import infoWrapper from "./components/AugmentingInfo";
import OperationWrapper from "./components/AugmentingOperation";
import ResponsesWrapper from "./components/AugmentingResponses";
import Fallback from "./components/ErrorBoundary/fallback";

import "./styles.css";

// Overwriting requires lowercase versions of the react components in swagger-ui
const SwaggerUIKongTheme = (system) => {
  const { withErrorBoundary } = system.fn;

  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false
        }
      }
    },
    components: {
      curl: () => null,
      KongLayout: KongLayout,
      Sidebar: Sidebar,
      SidebarList: SidebarList,
      contentType: ContentType,
      ExamplesSelect: ExamplesSelect,
      Models: withErrorBoundary(Models),
      ModelCollapse: ModelCollapse,
      OperationTag: OperationTag,
      FilterContainer: FilterContainer,
      operations: withErrorBoundary(Operations),
      modelExample: ModelExample,
      ModelWrapper: ModelWrapper,
      highlightCode: HighlightCode,
      TryItOutButton: withErrorBoundary( (props) => (
        <TryItOutButton {...props} specSelectors={system.specSelectors} />
      )),
      Fallback,
      ErrorBoundary
    },
    wrapComponents: {
      responses: ResponsesWrapper,
      operation: OperationWrapper,
      info: infoWrapper,
      TryItOutButton: tryItOutWrapper,
    },
  };
};

export { SwaggerUIKongTheme, KongLayout };
