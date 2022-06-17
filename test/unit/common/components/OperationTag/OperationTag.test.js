import React from 'react';
import {render} from '@testing-library/react';
import OperationTag from "components/OperationTag";

describe('<OperationTag/>', () => {
    let component;

    beforeAll(() => {
        const OperationTagProps = {
            layoutActions: undefined,
            tagObj: undefined,
            tag: undefined,
            children: undefined,
            layoutSelectors: undefined,
            getConfigs: jest.fn(),
            getComponent: jest.fn()
        };

        component = render(<OperationTag {...OperationTagProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    })

    afterAll(() => {
        component = null;
    })
})
