import React from 'react';
import {render} from '@testing-library/react';
import Immutable, {Map} from "immutable";
import Parameters from "components/Parameters";

describe('<Parameters/>', () => {

    const mockedParameterRowComponent = () => <div>Mocked Parameter Row Component</div>;
    const mockedTryItOutComponent = () => <div>Mocked Parameter Row Component</div>;
    const mockedContentTypeComponent = () => <div>Mocked Content Type Component</div>;
    const mockedCallbacksComponent = () => <div>Mocked Callbacks Component</div>;
    const mockedRequestBodyComponent = () => <div>Mocked RequestBody Component</div>;

    const list = new Immutable.List();
    list.set(0, {
        name: "start_latitude",
        in: "query",
        description: "Latitude component of start location.",
        required: true,
        type: "number",
        format: "double"
    });

    const ParametersProps = {
        parameters: list,
        operation: new Map({
                requestBody: new Map({})
            })
        ,
        specActions: {
            changeParamByIdentity: jest.fn(),
            changeConsumesValue: jest.fn()
        },
        getComponent: jest.fn((param, bool) => {
            if (param === 'parameterRow') {
                return mockedParameterRowComponent;
            } else if (param === 'TryItOutButton') {
                return mockedTryItOutComponent;
            } else if (param === 'contentType') {
                return mockedContentTypeComponent;
            } else if (param === 'Callbacks' && bool) {
                return mockedCallbacksComponent;
            } else {
                return mockedRequestBodyComponent;
            }
        }),
        specSelectors: {
            isOAS3: jest.fn(() => true),
            parameterWithMetaByIdentity: jest.fn()
        },
        oas3Selectors: {
            requestBodyErrors: jest.fn(),
            requestBodyInclusionSetting: jest.fn(),
            requestContentType: jest.fn(),
            hasUserEditedBody: jest.fn(),
            shouldRetainRequestBodyValue: jest.fn(() => true),
            requestBodyValue: jest.fn(() => []),
            activeExamplesMember: jest.fn(),
        },
        oas3Actions: {
            setRequestContentType: jest.fn(),
            initRequestBodyValidateError: jest.fn(),
            setRequestBodyValue: jest.fn(),
            setRetainRequestBodyValueFlag: jest.fn(),
            setRequestBodyInclusion: jest.fn()
        },
        fn: {},
        tryItOutEnabled: false,
        allowTryItOut: false,
        onTryoutClick: jest.fn(),
        onCancelClick: jest.fn(),
        onChangeKey: ["mock1", "mock2"],
        pathMethod: [],
        getConfigs: jest.fn(() => {}),
        specPath: ["mock1", "mock2"]
    };

    const renderComponent = (props = ParametersProps) => {
        const {container} = render(<Parameters {...props}/>);
        return container;
    };

    it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        }
    );
})
