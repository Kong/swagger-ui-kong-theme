import React from 'react';
import {render,} from '@testing-library/react';
import AugmentingOperation from "components/AugmentingOperation";

describe('<AugmentingOperation/>', () => {
    let component;
    const AugmentingOperationProps = {
        getComponent: jest.fn(),
        specSelectors: undefined,
        schema: undefined,
        specPath: undefined,
        getConfigs: jest.fn(),
        isExecute: undefined,
        example: undefined
    };
    beforeAll(() => {
        component = render(<AugmentingOperation {...AugmentingOperationProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(() => {
        component = null;
    })

});
