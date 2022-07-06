import React from 'react';
import {render, screen} from '@testing-library/react';
import TryItOutButton from "components/TryItOutButton";

describe('<TryItOutButton/>', () => {

    const TryItOutButtonProps = {
        onTryOutClickMock: jest.fn(),
        onCancelClickMock: jest.fn(),
        enabled: false,
        specSelectors: {
            servers: () => [
                'MOCK_SERVER_1',
                'MOCK_SERVER_2'
            ]
        }
    };

    const renderComponent = (props = TryItOutButtonProps) => {
        const {container} = render(<TryItOutButton {...props}/>);
        return container;
    }

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
        expect(container).toBeVisible();
    });

    it('can render content when servers not empty', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
    });

    it('has no content when servers are empty', async () => {
        renderComponent({
            ...TryItOutButtonProps, specSelectors: {
                servers: () => []
            }
        });
        const el = await screen.queryByText('Try it out');
        expect(el).toBeNull();
    });

    it('has button `Try it out`', () => {
        renderComponent();
        expect(screen.queryByText('Try it out')).toBeTruthy();
    });

    it('has an aria label text: `Try sending an example request`', () => {
        renderComponent();
        const text = screen.getByLabelText('Try sending an example request');
        expect(text).toBeTruthy();
    });

    it('has button `Cancel`', () => {
        renderComponent({...TryItOutButtonProps, enabled: true})
        expect(screen.queryByText('Cancel')).toBeTruthy();
    });

    it('has an aria label text: `Cancel sending an example request`', () => {
        renderComponent({...TryItOutButtonProps, enabled: true})
        const text = screen.getByLabelText('Cancel sending an example request');
        expect(text).toBeTruthy();
    });


});
