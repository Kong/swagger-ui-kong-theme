import React from 'react';
import {render} from '@testing-library/react';
import OperationTag from "components/OperationTag";

xdescribe('<OperationsTag/>', () => {

    const OperationsTagProps = {
        layoutActions: jest.fn(),
        tagObj: {
        tagDetails: {
            description: 'MOCK_DESCRIPTION',
            externalDocs: {
                description: 'MOCK_EXTERNAL_DOCS_DESCRIPTION',
                url: 'MOCK_URL'
            }
        }
    },
        tag: {},
        children: {},
        layoutSelectors: jest.fn(() =>{
            return {
                isShown: function(arg1, arg2){return true}
        }}),
        getConfigs: jest.fn(() => {
            return {
                docExpansion: 'full'
            }
        }),
        getComponent: jest.fn(arg => {
            if (arg === 'Collapse') {
                return <div>Collapse Mock Component</div>
            } else if (arg === 'Markdown') {
                return <div>MarkDown Mock Component</div>
            } else if (arg === 'DeepLink') {
                return <div>DeepLink Mock Component</div>
            } else {
                return <div>Link Mock Component</div>
            }
        })
    }

    const renderComponent = (props = OperationsTagProps) => {
        const {container} = render(<OperationTag {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

    it('has classname `opblock-tag-section`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName('opblock-tag-section');
        expect(el.length).toEqual(1);
    });
});
