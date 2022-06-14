/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/models.jsx
 * @prettier
 */
import React, { useCallback } from "react";
import Im, { Map } from "immutable";

export default function Models({
  specSelectors,
  getComponent,
  layoutSelectors,
  layoutActions,
  getConfigs,
  specActions,
}) {
  const getSchemaBasePath = useCallback(() => {
    const isOAS3 = specSelectors.isOAS3();
    return isOAS3 ? ["components", "schemas"] : ["definitions"];
  }, [specSelectors]);

  const getCollapsedContent = () => {
    return " ";
  };

  const handleToggle = useCallback(
    (name, isExpanded) => {
      layoutActions.show(["models", name], isExpanded);

      if (isExpanded) {
        specActions.requestResolvedSubtree([getSchemaBasePath(), name]);
      }
    },
    [specActions, layoutActions]
  );

  const handleKeypress = (event, showModels) => {
    if (
      event.nativeEvent.code === "Enter" ||
      event.nativeEvent.code === "Space"
    ) {
      layoutActions.show("models", !showModels);
    }
  };

  let definitions = specSelectors.definitions();
  let { docExpansion, defaultModelsExpandDepth } = getConfigs();
  if (!definitions.size || defaultModelsExpandDepth < 0) return null;

  let showModels = layoutSelectors.isShown(
    "models",
    defaultModelsExpandDepth > 0 && docExpansion !== "none"
  );
  const specPathBase = getSchemaBasePath();
  const isOAS3 = specSelectors.isOAS3();

  const ModelWrapper = getComponent("ModelWrapper");
  const Collapse = getComponent("Collapse");
  const ModelCollapse = getComponent("ModelCollapse");
  const JumpToPath = getComponent("JumpToPath");

  return (
    <section className={showModels ? "models is-open" : "models"}>
      <div
        role="button"
        aria-pressed={showModels}
        onClick={() => layoutActions.show("models", !showModels)}
        onKeyUp={(e) => handleKeypress(e, showModels)}
        tabIndex={0}
      >
        <h1>
          <span>{isOAS3 ? "Schemas" : "Models"}</span>
          <svg width="20" height="20">
            <use
              xlinkHref={showModels ? "#large-arrow-down" : "#large-arrow"}
            />
          </svg>
        </h1>
      </div>
      <Collapse isOpened={showModels}>
        {definitions
          .entrySeq()
          .map(([name]) => {
            const fullPath = [...specPathBase, name];

            const schemaValue = specSelectors.specResolvedSubtree(fullPath);
            const rawSchemaValue = specSelectors.specJson().getIn(fullPath);

            const schema = Map.isMap(schemaValue) ? schemaValue : Im.Map();
            const rawSchema = Map.isMap(rawSchemaValue)
              ? rawSchemaValue
              : Im.Map();

            const displayName =
              schema.get("title") || rawSchema.get("title") || name;
            const isShown = layoutSelectors.isShown(["models", name], false);
            const isExpanded = defaultModelsExpandDepth > 0 && isShown;

            if (isShown && schema.size === 0 && rawSchema.size > 0) {
              // Firing an action in a container render is not great,
              // but it works for now.
              specActions.requestResolvedSubtree([
                ...getSchemaBasePath(),
                name,
              ]);
            }

            const specPath = Im.List([...specPathBase, name]);

            const content = (
              <ModelWrapper
                name={name}
                expandDepth={defaultModelsExpandDepth}
                schema={schema || Im.Map()}
                displayName={displayName}
                specPath={specPath}
                getComponent={getComponent}
                specSelectors={specSelectors}
                getConfigs={getConfigs}
                layoutSelectors={layoutSelectors}
                layoutActions={layoutActions}
              />
            );

            const title = (
              <span className="model-box">
                <span className="model model-title">{displayName}</span>
              </span>
            );

            return (
              <div
                id={`model-${name}`}
                className="model-container"
                key={`models-section-${name}`}
              >
                <span className="models-jump-to-path">
                  <JumpToPath specPath={specPath} />
                </span>
                <ModelCollapse
                  classes="model-box"
                  collapsedContent={getCollapsedContent(name)}
                  onToggle={handleToggle}
                  title={title}
                  displayName={displayName}
                  modelName={name}
                  hideSelfOnExpand={true}
                  expanded={isExpanded}
                >
                  {content}
                </ModelCollapse>
              </div>
            );
          })
          .toArray()}
      </Collapse>
    </section>
  );
}
