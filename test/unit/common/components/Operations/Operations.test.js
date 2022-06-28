import React from 'react';
import {render} from '@testing-library/react';
import Operations from "components/Operations";

describe('<Operations/>', () => {
    const OperationsProps = {
        specActions: {
        },
        specSelectors: {
            taggedOperations: () => []
        },
        layoutSelectors: {
                currentFilter: () => {}
        },
        getComponent: jest.fn((arg) => {
                if (arg === 'OperationContainer') {
                    return (<div>Mock Operation Container</div>)
                }
                if (arg === 'OperationTag') {
                    return (<div>Mock Operation Tag</div>)
                }
            }
        ),
        layoutActions: jest.fn(),
        getConfigs: jest.fn(() => {
            return {
                maxDisplayedTags: 0
            }
        })
    };

    const renderComponent = (props = OperationsProps) => {
        const {container} = render(<Operations {...props}/>);
        return container;
    };

    it('was rendered', () => {
            const container = renderComponent();
            expect(container).toBeInTheDocument();
        }
    );
});
