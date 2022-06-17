import React from 'react';
import {render, screen} from '@testing-library/react';
import KongLayout from "components/Layout";


describe( '<KongLayout/>', () => {

    const LayoutProps = {
        onChange: jest.fn(),
        contentTypes: undefined,
        ariaControls: undefined,
        ariaLabel: 'Content type',
        className: '',
        controlId: '',
        value: '',
    };

    beforeEach(() => {
        render(<KongLayout {...LayoutProps}/>);
    });

    it('was rendered', () => {
        expect(screen).toBeVisible();
    })
});
