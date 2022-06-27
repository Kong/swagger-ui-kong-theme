import React from 'react';
import {render, screen} from '@testing-library/react';
import AugmentingOperation from "components/AugmentingOperation";

describe('<AugmentingOperation/>', () => {
    const AugmentingOperationProps = {
        response: {},
        operationProps: {
            tag: 'MOCK_TAG',
            operationId: 'MOCK_OPERATION_ID'
        }
    };

    const renderComponent = (props=AugmentingOperationProps) => {
        const {container} = render(<AugmentingOperation {...props}/>);
        return container;
    }

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

    it('has classname `operations-augment-wrapper`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('operations-augment-wrapper');
        expect(el).toBeTruthy();
    });

    describe('Empty response <AugmentingOperation', ()=>{
            const AugmentingOperationPropsEmpty = {};

            it('was rendered', () => {
                const container = renderComponent(AugmentingOperationPropsEmpty);
                expect(container).toBeInTheDocument();
            });

            it('has classname `empty`', () => {
                const container = renderComponent(AugmentingOperationPropsEmpty);
                const emptyEl = container.getElementsByClassName('empty');
                expect(emptyEl).toBeTruthy();
            })
    });


});
