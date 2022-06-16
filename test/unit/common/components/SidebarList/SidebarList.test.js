import React from 'react';
import {render, screen} from '@testing-library/react';
import SidebarList from "components/SidebarList";

describe('<SidebarList/>', () => {
    const SidebarListProps = {
        specSelectors: undefined,
        layoutSelectors: undefined,
        fn: jest.fn(),
        layoutActions: undefined,
        getComponent: undefined
    };

    beforeAll(() => {
        render(<SidebarList {...SidebarListProps} />);
    });

    it('was rendered', () => {
      expect(screen).toBeVisible()
    });

});
