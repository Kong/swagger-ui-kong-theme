import React from 'react';
import {render} from '@testing-library/react';
import Responses from "components/Responses";
import {Map} from "immutable";

describe('<Responses/>', () => {

    const mockedContentTypeComponent = () => <div>Mocked ContentType Component</div>;
    const mockedLiveResponseComponent = () => <div>Mocked Live Response Component</div>;
    const mockedResponseComponent = () => <div>Mocked Response Component</div>;


    const ResponsesProps = {
        specActions: null,
        tryItOutResponse: null,
        responses: new Map({
            keySeq: jest.fn()
        }),
        layoutActions: jest.fn(),
        getComponent: jest.fn((param) => {
            if (param === 'contentType') {
                return mockedContentTypeComponent;
            } else if (param === 'liveResponse') {
                return mockedLiveResponseComponent;
            } else {
                return mockedResponseComponent;
            }
        }),
        getConfigs: jest.fn(() => {
            return {
                defaultModelRendering: 'MOCK_RENDERING',
                defaultModelExpandDepth: 'DEFAULT_MODEL_EXPAND'
            }
        }),
        specSelectors: {
            isOAS3: () => true,
        },
        fn: jest.fn(),
        produces: null,
        producesValue: null,
        displayRequestDuration: true,
        specPath: [],
        path: [],
        method: null,
        oas3Selectors: {
            activeExamplesMember: jest.fn()
        },
        oas3Actions: {
            setResponseContentType: jest.fn()
        }
    };

    const renderComponent = (props = ResponsesProps) => {
        const {container} = render(<Responses {...props}/>);
        return container;
    };

    it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        }
    );
});
