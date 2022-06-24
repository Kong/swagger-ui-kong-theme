import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import Sidebar from "components/Sidebar";

import styles from "components/Sidebar/styles.module.css";

describe('<SideBar/>', () => {
        const MockedSidebarListComponent = () => <div> Mock SidebarList Component</div>;
        const SideBarProps = {
            getConfigs: jest.fn().mockReturnValueOnce({
                config: {
                    theme: {
                        swaggerAbsoluteTop: '2px'
                    }
                }
            }),
            getComponent: jest.fn(() => MockedSidebarListComponent)
        };

        const renderComponent = (props= SideBarProps) => {
            const {container} = render(<Sidebar {...props}/>);
            return container;
        };

        it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        });

        it('has className sidebar-toggle', () => {
            const container = renderComponent();
            const el = container.getElementsByClassName(styles.sidebarToggle);
            expect(el.length).toBe(1);
        });

        it('has a role button', () => {
            renderComponent();
            const btn = screen.getByRole('button');
            expect(btn).toBeInTheDocument();
        });

        it('has `Open Sidebar` title', () => {
            renderComponent();
            const btnTitle = screen.getByText('Open Sidebar');
            expect(btnTitle).toBeInTheDocument();
            expect(btnTitle).toBeVisible();
        })

        it('can be clicked: sidebar opens', async () => {
            renderComponent();
            await user.click(screen.getByRole('button'));
            const btnTitle = screen.getByText('Close Sidebar');
            expect(btnTitle).toBeVisible();
        });

        it('has `overlay open` classname', async () => {
            const container = renderComponent();
            await user.click(screen.getByRole('button'));

            const el = container.getElementsByClassName(`${styles.overlay} ${styles.open}`);
            expect(el.length).toBe(1);
        });

        it('has `overlay close` classname', () => {
            const container = renderComponent();

            const el = container.getElementsByClassName(`${styles.overlay} ${styles.open}`);
            expect(el.length).toBe(0);
        })

        it('can be clicked: sidebar opens & closes', async () => {
            renderComponent();
            await user.click(screen.getByRole('button'));
            await user.click(screen.getByRole('button'));
            const btnTitle = screen.getByText('Open Sidebar');
            expect(btnTitle).toBeVisible();
        });

        it('can be clicked: Sidebar list is rendered', async () => {
            renderComponent();
            await user.click(screen.getByRole('button'));
            const mockSidebarTitle = screen.getByText('Mock SidebarList Component');
            expect(mockSidebarTitle).toBeVisible();
        });


        it('on `Space` press opens sidebar', () => {
            renderComponent();
            fireEvent.keyDown(screen.getByRole('button'),{
                key: 'Space',
                code: 'Space'
            });
            expect(screen.getByText('Close Sidebar')).toBeVisible();
        });

    it('on `Enter` press close sidebar', () => {
        renderComponent();
        fireEvent.keyDown(screen.getByRole('button'),{
            key: 'Enter',
            code: 'Enter'
        });
        expect(screen.getByText('Close Sidebar')).toBeVisible();
    });

    it('on `Return` press close sidebar', () => {
        renderComponent();
        fireEvent.keyDown(screen.getByRole('button'),{
            key: 'Return',
            code: 'Return'
        });
        expect(screen.getByText('Close Sidebar')).toBeVisible();
    });

    }
)
