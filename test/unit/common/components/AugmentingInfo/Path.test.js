import React from 'react';
import {render, screen} from '@testing-library/react';
import {Path} from "components/AugmentingInfo";

describe('<Path/>', () => {
    const PathProps = {
        host: 'MOCK_HOST',
        basePath: 'MOCK_BASEPATH'
    };

    const renderComponent = () => {
        const {container} = render(<Path {...PathProps}/>);
        return container;
    }

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeTruthy();
        expect(container).toBeInTheDocument();
    });

    it('has default classname', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(`base-url`);
        expect(el).toBeTruthy();
    })

    it('has `host` & `basePath` property rendered', () => {
        renderComponent();
        const text = screen.getByText(`[Base Url: ${PathProps.host}${PathProps.basePath}]`);
        expect(text).toBeTruthy();
    });

});
