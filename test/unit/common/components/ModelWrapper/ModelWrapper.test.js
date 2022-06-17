import React from 'react';
import {render} from '@testing-library/react';
import ModelWrapper from 'src/components/ModelWrapper';

describe('<ModelWrapper/>', () => {
    const ModelWrapperProps = {
        layoutActions: undefined,
        layoutSelectors: undefined,
        getComponent: jest.fn(),
        expandDepth: jest.fn()
    };

    let component;
    beforeAll(() => {
        component = render(<ModelWrapper {...ModelWrapperProps}/>);
    });
    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(() => {
        component = null;
    })
});
