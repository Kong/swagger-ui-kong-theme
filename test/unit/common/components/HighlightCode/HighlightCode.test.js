import React from 'react';
import {render, screen} from '@testing-library/react';
import HighlightCode from 'components/HighlightCode';

describe( '<HighlightCode/>', () => {

    let component;

    const HighlightCodeProps = {
        onChange: jest.fn(),
        contentTypes: undefined,
        ariaControls: undefined,
        ariaLabel: 'Content type',
        className: '',
        controlId: '',
        value: '',
    };

    beforeEach(() => {
        component = render(<HighlightCode {...HighlightCodeProps}/>);
    });

    it('was rendered', () => {
        expect(screen).toBeVisible();
    });

    afterAll(()=>{
        component = null;
    })
});
