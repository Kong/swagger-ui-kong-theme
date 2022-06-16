import React from 'react';
import {render, screen} from '@testing-library/react';
import Sidebar from "components/Sidebar";

describe('<Sidebar/>', () => {
    const SidebarProps = {};
    beforeAll(() => {
        render(<Sidebar {...SidebarProps}/>);
    });

    it('was rendered', () => {

    });
})
