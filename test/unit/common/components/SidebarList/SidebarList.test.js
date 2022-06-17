import React from 'react';
import {render, screen} from '@testing-library/react';
import SidebarList from "components/SidebarList";

describe('<SidebarList/>', () => {
    let component;
    const SidebarListProps = {
        specSelectors: undefined,
        layoutSelectors: undefined,
        fn: jest.fn(),
        layoutActions: undefined,
        getComponent: undefined
    };

    beforeEach(() => {
        render(<SidebarList {...SidebarListProps} />);
    });

    it('was rendered', () => {
        expect(screen).toBeVisible()
    });

    afterAll(() => {
        component = null;
    })

});
