import React from 'react';
import {render} from '@testing-library/react';
import Sidebar from "components/Sidebar";

describe('<Sidebar/>', () => {
    let component;
    const SidebarProps = {
        getConfigs: jest.fn(),
        getComponent: jest.fn()
    };
    beforeAll(() => {
        component = render(<Sidebar {...SidebarProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(() => {
        component = null;
    });
})
