import React from 'react';
import {render} from "@testing-library/react";
import SidebarList from "components/SidebarList";

describe('<SidebarList/>', () => {
    const mockedFilterContainer =  () => <div>Mocked FilterContainer Component</div>;
    const SidebarListProps = {
        specSelectors: {
            taggedOperations: () => []
        },
        layoutSelectors: {
            currentFilter: () => {}
        },
        getComponent: jest.fn((param, bool) => {
            return param === 'FilterContainer' && bool ? mockedFilterContainer : null
        }),
        layoutActions: jest.fn(),
        fn: jest.fn()
    };

    const renderComponent = (props = SidebarListProps) => {
        const {container} = render(<SidebarList {...props}/>);
        return container;
    };

    it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        }
    );
});
