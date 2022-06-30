import React from 'react';
import {render} from '@testing-library/react';
import {TryItOutWrapper} from "components/TryItOutButton";


describe('<TryItOutWrapper/>', () => {
    const TryItOutWrapperProps = {
        Original: jest.fn(() => (<div>ORIGINAL MOCK COMPONENT</div>)),
        system: jest.fn(() => {
        }),
    };

    const renderComponent = (props = TryItOutWrapperProps) => {
        const {container} = render(<TryItOutWrapper {...props} />);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

});
