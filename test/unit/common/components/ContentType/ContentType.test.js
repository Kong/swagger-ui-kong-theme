import React from 'react';
import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import TryItOutButton from 'components/TryItOutButton';
import ContentType from "components/ContentType";

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

    beforeEach(() => {
        render(<ContentType {...ContentTypeProps}/>);
    });

    it('was rendered', () => {
        expect(screen).toBeVisible();
    })
});
