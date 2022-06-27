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
import TryItOutButton from "./components/TryItOutButton";

import infoWrapper from "./components/AugmentingInfo";
import OperationWrapper from "./components/AugmentingOperation";
import responsesWrapper from "./components/AugmentingResponses";

import './styles.css';

// Overwriting requires lowercase versions of the react components in swagger-ui
const SwaggerUIKongTheme = (system) => {
  return {
    components: {
      curl: () => null,
      KongLayout: KongLayout,
      Sidebar: Sidebar,
      SidebarList: SidebarList,
      contentType: ContentType,
      ExamplesSelect: ExamplesSelect,
      Models: Models,
      ModelCollapse: ModelCollapse,
      OperationTag: OperationTag,
      FilterContainer: FilterContainer,
      operations: Operations,
      modelExample: ModelExample,
      ModelWrapper: ModelWrapper,
      highlightCode: HighlightCode,
      TryItOutButton: TryItOutButton,
    },
    wrapComponents: {
      responses: responsesWrapper,
      operation: OperationWrapper,
      info: infoWrapper,
    },
  };
};

export { SwaggerUIKongTheme, KongLayout };
