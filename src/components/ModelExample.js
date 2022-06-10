/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/model-example.jsx
 * @prettier
 */

import {useEffect} from "react";

export default function ModelExample({
                                         getComponent,
                                         specSelectors,
                                         schema,
                                         specPath,
                                         getConfigs,
                                         isExecute,
                                         example,
                                     }) {
    const [activeTab, setActiveTab] = useState(() => {
        const {defaultModelRendering} = getConfigs();

        if (
            defaultModelRendering !== "example" &&
            defaultModelRendering !== "model"
        ) {
            return "example";
        }

        if (isExecute) {
            return "example";
        }

        return defaultModelRendering;
    });

    const onTabchange = (e) => {
        const {
            target: {
                dataset: {name},
            },
        } = e;

        setActiveTab(name);
    };

    const handleKeypress = (event) => {
        if (
            event.nativeEvent.code === "Enter" ||
            event.nativeEvent.code === "Space"
        ) {
            this.activeTab(event);
        }
    };

    useEffect(() => {
        if (isExecute && example) {
            setActiveTab("example");
        }
    }, [isExecute, example]);

    const {defaultModelExpandDepth} = getConfigs();
    const ModelWrapper = getComponent("ModelWrapper");
    const HighlightCode = getComponent("highlightCode");
    let isOAS3 = specSelectors.isOAS3();

    return (
        <div className="model-example">
            <ul className="tab">
                <li className={"tabitem" + (activeTab === "example" ? " active" : "")}>
                    <a
                        role="button"
                        tabIndex={0}
                        aria-label={
                            isExecute
                                ? "Anchor tag to open edit value"
                                : "Anchor tag to display example value"
                        }
                        onKeyUp={handleKeypress}
                        className="tablinks"
                        data-name="example"
                        onClick={onTabchange}
                    >
                        {isExecute ? "Edit Value" : "Example Value"}
                    </a>
                </li>
                {schema ? (
                    <li className={"tabitem" + (activeTab === "model" ? " active" : "")}>
                        <a
                            role="button"
                            tabIndex={0}
                            aria-label={
                                isOAS3
                                    ? "Anchor tag to show schema"
                                    : "Anchor tag to show model"
                            }
                            onKeyUp={handleKeypress}
                            className={"tablinks" + (isExecute ? " inactive" : "")}
                            data-name="model"
                            onClick={onTabchange}
                        >
                            {isOAS3 ? "Schema" : "Model"}
                        </a>
                    </li>
                ) : null}
            </ul>
            <div>
                {activeTab === "example" ? (
                    example ? (
                        example
                    ) : (
                        <HighlightCode value="(no example available)"/>
                    )
                ) : null}
                {activeTab === "model" && (
                    <ModelWrapper
                        schema={schema}
                        getComponent={getComponent}
                        getConfigs={getConfigs}
                        specSelectors={specSelectors}
                        expandDepth={defaultModelExpandDepth}
                        specPath={specPath}
                    />
                )}
            </div>
        </div>
    );
}
