import React from 'react';
import {render, screen} from '@testing-library/react';
import ContentType from "src/components/ContentType";

describe( '<ContentType/>', () => {

    const ContentTypeProps = {
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
        component = render(<ContentType {...ContentTypeProps}/>);
    });

    it('was rendered', () => {
        expect(screen).toBeVisible();
    });

    afterAll(()=>{
        component = null;
    })
});
