import React from 'react';
import {render, screen} from '@testing-library/react';
import ModelExample from "components/ModelExample";

describe('<ModelExample/>', () => {
    const ModelExampleProps = {
        getComponent: jest.fn((arg) => {
            return arg === 'ModelWrapper' ? () => <div>Model Wrapper Mock</div> : () => <div>Highlight Code Mock </div>
        }),
        specSelectors: {
                isOAS3: () => true
        },
        schema: {},
        specPath: 'MOCK_PATH',
        getConfigs: jest.fn(() => {
            return {
                defaultModelRendering: 'MOCK_RENDERING',
                defaultModelExpandDepth: 'DEFAULT_MODEL_EXPAND'
            }
        }),
        isExecute: true,
        example: 'MOCK_EXAMPLE'
    };

    const renderComponent = (props = ModelExampleProps) => {
        const {container} = render(<ModelExample {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

    it('has classname `model-example`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('model-example');
        expect(el.length).toEqual(1);
    });

    it('has classname `tab`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('tab');
        expect(el.length).toEqual(1);
    });

    it('has li element', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('tab');
        expect(el.length).toEqual(1);
    });

    it('li elements have classname `tabitem`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('tabitem');
        expect(el.length).toEqual(2);
    });

    it('has button `Edit value` & `Schema`', () => {
        renderComponent();
        const btn = screen.getAllByRole('button');
        expect(btn).toBeTruthy();
        expect(btn.length).toEqual(2);
    });

    it('button `Edit Value` exists', () => {
        renderComponent();
        const el = screen.findByLabelText('Edit Value');
        expect(el).toBeTruthy();
    });

    it('button `Edit Value` has aria label correct', () => {
        renderComponent();
        const el = screen.getByLabelText('Anchor tag to open edit value');
        expect(el).toBeTruthy();
    });

    it('button `Schema` exists', () => {
        renderComponent();
        const el = screen.findByLabelText('Schema');
        expect(el).toBeTruthy();
    });

    it('button `Schema` has aria label correct', () => {
        renderComponent();
        const el = screen.getByLabelText('Anchor tag to show schema');
        expect(el).toBeTruthy();
    });

    it('buttons have classname', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('tablinks');
        expect(el.length).toEqual(2);
    });

    it('schema is `true`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('tabitem');
        expect(el.length).toEqual(2);
    });

    it('highlight component is rendered', () => {
        renderComponent();
        const el = screen.findByText('MOCK_EXAMPLE');
        expect(el).toBeTruthy();
    })
});
