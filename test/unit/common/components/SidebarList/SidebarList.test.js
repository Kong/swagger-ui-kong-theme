import React from 'react';
import {render} from '@testing-library/react';
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
        component = render(<SidebarList {...SidebarListProps} />);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument()
    });

    afterAll(() => {
        component = null;
    })

});
