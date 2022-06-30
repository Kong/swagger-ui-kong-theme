import React from 'react';
import {render} from '@testing-library/react';
import { Map } from "immutable";
import OperationTag from "components/OperationTag";

describe('<OperationsTag/>', () => {

    const mockedCollapse = () => <div>Mocked Collapse Component</div>;
    const mockedMarkdown = () => <div>Mocked Markdown Component</div>;
    const mockedDeepLink = () => <div>Mocked DeepLink Component</div>;
    const mockedLink = () => <div>Mocked Link Component</div>;

    const OperationsTagProps = {
        layoutActions: jest.fn(),
        tagObj: new Map({
        tagDetails: {
            name: 'MOCK_TAG',
            description: 'MOCK_DESCRIPTION',
            externalDocs: {
                description: 'MOCK_EXTERNAL_DOCS_DESCRIPTION',
                url: 'MOCK_URL'
            }
        }
    }),
        tag: {},
        children: {},
        layoutSelectors: {
                isShown: function(){return true}
        },
        getConfigs: jest.fn(() => {
            return {
                docExpansion: 'full'
            }
        }),
        getComponent: jest.fn((arg) => {
                if (arg === 'Collapse') {return mockedCollapse}
                if (arg === 'Markdown') {return mockedMarkdown}
                if (arg === 'DeepLink') {return mockedDeepLink}
                if (arg === 'Link') {return mockedLink}

            }
        )
    }

    const renderComponent = (props = OperationsTagProps) => {
        const {container} = render(<OperationTag {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

});
