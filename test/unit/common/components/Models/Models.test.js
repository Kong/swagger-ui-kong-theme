import React from 'react';
import {render} from '@testing-library/react';
import Models from "components/Models";

describe('<Models />', () => {

    const mockedModelWrapperComponent = () => <div>Mocked ModelWrapper Component</div>;
    const mockedCollapseComponent = () => <div>Mocked Collapse Component</div>;
    const mockedModelCollapseComponent = () => <div>Mocked Model Collapse Component</div>;
    const mockedJumpToPathComponent = () => <div>Mocked Jump To Path Component</div>;


    const ModelsProps = {
        layoutActions: jest.fn(),
        getComponent: jest.fn((param) => {
            if(param === 'ModelWrapper'){
                return mockedModelWrapperComponent;
            } else if (param === 'Collapse') {
                return mockedCollapseComponent;
            } else if( param === 'ModelCollapse'){
                return mockedModelCollapseComponent;
            } else {
                return mockedJumpToPathComponent;
            }
        }),
        getConfigs: jest.fn(() => {
            return {
                defaultModelRendering: 'MOCK_RENDERING',
                defaultModelExpandDepth: 'DEFAULT_MODEL_EXPAND'
            }
        }),
        specActions: null,
        specSelectors: {
            taggedOperations: () => [],
            definitions: () => []
        },
        layoutSelectors: {
            currentFilter: () => {}
        },
    };

    const renderComponent = (props = ModelsProps) => {
        const {container} = render(<Models {...props}/>);
        return container;
    };

    it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        }
    );
});
