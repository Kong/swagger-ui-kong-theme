/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/model-wrapper.jsx
 * @prettier
 */

const ModelWrapper = (props) => {
  const { layoutActions, layoutSelectors, getComponent, expandDepth } = props;

  const onToggle = (name, isShown) => {
    // If this prop is present, we'll have deepLinking for it
    layoutActions?.show(["models", name], isShown);
  };

  const Model = getComponent("Model");

  // If this is prop is present, we'll have deepLinking for it
  const expanded =
      layoutSelectors?.isShown(["models", this.props.name]) || false;

  return (
      <div className="model-box" tabIndex={0}>
        <Model
            {...props}
            expanded={expanded}
            depth={1}
            onToggle={onToggle}
            expandDepth={expandDepth || 0}
        />
      </div>
  );
}

export default ModelWrapper;
