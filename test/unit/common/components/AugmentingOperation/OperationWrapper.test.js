import React from 'react';
import {render, screen} from '@testing-library/react';
import OperationWrapper from "components/AugmentingOperation";


describe('<operationWrapper/>', () => {
    const OperationWrapperProps = {
        Original: jest.fn(() => (<div>ORIGINAL MOCK COMPONENT</div>)),
        system: jest.fn(() => {
        }),
    };

    const renderComponent = (props = OperationWrapperProps) => {
        const {container} = render(<OperationWrapper {...props} />);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });


    xit('has className `operations-augment-wrapper`', () => {
        const container = renderComponent();
        const classNames = container.getElementsByClassName('operations-augment-wrapper');
        expect(classNames).toEqual(1);
    });

    xit('has rendered `Original` component', () => {
        renderComponent();
        const originalEl = screen.getByText('ORIGINAL MOCK COMPONENT');
        expect(originalEl).toBeVisible();
    });

    xit('has rendered Augmenting Operation', () => {
        //to do finish when test for AO is complete
    });
});
