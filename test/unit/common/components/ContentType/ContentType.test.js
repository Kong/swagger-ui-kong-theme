import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ContentType from "components/ContentType";
import user from '@testing-library/user-event';

describe('<ContentType/>', () => {

    const ContentTypeProps = {
        onChange: jest.fn(),
        contentTypes: ['contentType#1', 'contentType#2'],
        ariaControls: undefined,
        className: 'MOCK_CLASSNAME',
        controlId: 'CONTROL_ID',
        value: 'contentType#2',
        ariaLabel: 'MOCK_ARIA_LABEL'
    };

    const renderComponent = () => {
        const {container} = render(<ContentType {...ContentTypeProps}/>);
        return container;
    }

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
        expect(container).toBeVisible();
    })

    it('has default classname & passed classname', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(ContentTypeProps.className);
        expect(el).toBeTruthy();
    });

    it('has passed aria-label', () => {
        renderComponent();
        const text = screen.getByLabelText(ContentTypeProps.ariaLabel);
        expect(text).toBeTruthy();
    })

    it('has a select element ', () => {
        renderComponent();
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeTruthy();
    });

    it('select element has preselected value', () => {
        renderComponent();
        expect(screen.getByRole('option', {name: ContentTypeProps.value}).selected).toBe(true);
    })

    it('select element can show more values', async() => {
        renderComponent();
        const selectElement = screen.getByRole('combobox');
        await user.click(selectElement);
        const option_1 = screen.getByText(ContentTypeProps.contentTypes[0]);
        const option_2 = screen.getByText(ContentTypeProps.contentTypes[1]);

        expect(option_1).toBeTruthy();
        expect(option_2).toBeTruthy()
    });

    it('select element can change value', async () => {
        renderComponent();
        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, {target: { value: ContentTypeProps.contentTypes[1]}});
        expect(screen.getByRole('option', {name: ContentTypeProps.contentTypes[1]}).selected).toBe(true);
    });
});
