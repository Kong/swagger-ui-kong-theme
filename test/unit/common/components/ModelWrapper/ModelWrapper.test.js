import React from 'react';
import {render} from '@testing-library/react';
import ModelWrapper from "components/ModelWrapper";

describe('<ModelWrapper />', () => {
    const mockedModelComponent = () => <div>Mocked Model Component</div>;
    const ModelWrapperProps = {
        layoutActions: null,
        layoutSelectors: null,
        getComponent: jest.fn((param) => {
            return param === 'Model' ? mockedModelComponent : null
        }),
        expandDepth: 0,
        name: 'MOCK_NAME'
    };

    const renderComponent = (props = ModelWrapperProps) => {
        const {container} = render(<ModelWrapper {...props}/>);
        return container;
    };

    it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        }
    );
});
