import React from 'react';
import {render} from '@testing-library/react';
import AugmentingResponses from "components/AugmentingResponses";

describe('<AugmentingResponses />', () => {
    const AugmentingResponsesProps = {
        system: {},
        specSelectors: jest.fn(() => {
            return {
                specJson: () => {},
                host: () => 'MOCK_HOST',
                operationScheme: () => 'MOCK_OPERATION_SCHEME',
                basePath: () => 'MOCK_BASE_PATH'
            }
        }),
        getConfigs: jest.fn(() => {
            return {
                config: {
                    theme: {
                        languages: [
                            {
                                prismLanguage: "bash",
                                target: "shell",
                                client: "curl",
                            },
                            {
                                prismLanguage: "javascript",
                                target: "javascript",
                                client: "xhr",
                            }
                        ]
                    }
                }
            }

        }),
        specPath: [],
        path: 'MOCK_PATH',
        method: null
    };

    const renderComponent = (props = AugmentingResponsesProps) => {
        const {container} = render(<AugmentingResponses {...props}/>);
        return container;
    };

    it('was rendered', () => {
       const container = renderComponent();
       expect(container).toBeInTheDocument();
    });
})
