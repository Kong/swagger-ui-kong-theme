import React from 'react';
import {render} from '@testing-library/react';
import Operations from "components/Operations";

describe('<Layout />', () => {

    const mockedSvgAssets = () => <div>Mocked SvgAssets Component</div>;
    const mockedInfoContainer = () => <div>Mocked InfoContainer Component</div>;
    const mockedVersionPragmaFilter = () => <div>Mocked VersionPragmaFilter Component</div>;
    const mockedOperations = () => <div>Mocked Operations Component</div>;
    const mockedModels = () => <div>Mocked Models Component</div>;
    const mockedCol = () => <div>Mocked Col Component</div>;

    const mockedErrors = () => <div>Mocked Errors Component</div>
    const mockedServers = () => <div>Mocked Servers Component</div>
    const mockedSchemes = () => <div>Mocked Schemes Component</div>
    const mockedAuthorizeBtnContainer = () => <div>Mocked AuthorizeBtnContainer Component</div>
    const mockedSidebar = () => <div>Mocked Sidebar Component</div>

    const OperationsProps = {
        specSelectors: {
            taggedOperations: () => [],
            isSwagger2: () => true,
            isOAS3: () => true
        },
        layoutSelectors: {
            currentFilter: () => {}
        },
        getComponent: jest.fn((arg, bool) => {
                if (arg === 'SvgAssets' && bool) {return mockedSvgAssets}
                if (arg === 'InfoContainer' && bool) {return mockedInfoContainer}
                if (arg === 'VersionPragmaFilter' && bool) {return mockedVersionPragmaFilter}
                if (arg === 'operations' && bool) {return mockedOperations}
                if (arg === 'Models' && bool) {return mockedModels}
                if (arg === 'Col') {return mockedCol}
                if (arg === 'errors' && bool) {return mockedErrors}
                if (arg === 'ServersContainer' && bool) {return mockedServers}
                if (arg === 'SchemesContainer' && bool) {return mockedSchemes}
                if (arg === 'AuthorizeBtnContainer' && bool) {return mockedAuthorizeBtnContainer}
                if (arg === 'Sidebar' && bool) {return mockedSidebar}

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
    });

})
