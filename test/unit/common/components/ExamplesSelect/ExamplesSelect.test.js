import React from 'react';
import {render, screen} from '@testing-library/react';
import ExamplesSelect from "components/ExamplesSelect";

describe( '<ExamplesSelect/>', () => {

    const ExamplesSelectProps = {
        onChange: jest.fn(),
        contentTypes: undefined,
        ariaControls: undefined,
        ariaLabel: 'Content type',
        className: '',
        controlId: '',
        value: '',
    };

    let component;

    beforeAll(() => {
        component = render(<ExamplesSelect {...ExamplesSelectProps}/>);
    });

    it('was rendered', () => {
        expect(screen).toBeVisible();
    });

    afterAll(()=>{
        component = null;
    })
});
