import React from 'react';
import {render, screen} from '@testing-library/react';
import ResponsesWrapper from "components/AugmentingResponses";


xdescribe('<ResponsesWrapper/>', () => {
    const ResponseWrapperProps = {
        Original: jest.fn(() => (<div>ORIGINAL MOCK COMPONENT</div>)),
        system: jest.fn(() => {
        }),
    };

    const renderComponent = (props = ResponseWrapperProps) => {
        const {container} = render(<ResponsesWrapper {...props} />);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

    //TODO: check classname getting
    xit('has className `rightSideWrapper`', () => {
        const container = renderComponent();
        const classNames = container.getElementsByClassName('operations-augment-wrapper');
        expect(classNames).toEqual(1);
    });

    xit('has rendered `Original` component', () => {
        renderComponent();
        const originalEl = screen.getByText('ORIGINAL MOCK COMPONENT');
        expect(originalEl).toBeVisible();
    });

    xit('has rendered Augmenting Responses', () => {
        //to do finish when test for AO is complete
    });
});
