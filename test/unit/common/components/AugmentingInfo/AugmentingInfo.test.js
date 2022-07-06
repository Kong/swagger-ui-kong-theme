import React from 'react';
import {render} from '@testing-library/react';
import AugmentingInfo from 'components/AugmentingInfo';

describe('<AugmentingInfo/>', () => {

    const mockedMarkdownComponent = () => <div>Mocked Markdown Component</div>;
    const mockedVersionStampComponent = () => <div>Mocked Version Stamp Component</div>;

    const AugmentingInfoProps = {
        info: {
            version: 'MOCK_VERSION',
            description: 'MOCK_DESCRIPTION',
            title: 'MOCK_TITLE',
            termsOfService: 'MOCK_TERMS_OF_SERVICE',
            contact: {
                name: 'MOCK_CONTACT',
                url: 'MOCK_URL',
                email: 'MOCK_EMAIL',
                size: 'MOCK_SIZE',
                get: function (val) {
                    return this[val];
                }
            },
            licence: {
                name: 'MOCK_LICENCE',
                url: 'MOCK_URL',
                size: 'MOCK_SIZE',
                get: function (val) {
                    return this[val]
                },
            },
            get: function (val) {
                return this[val]
            }
        },
        url: 'MOCK_URL',
        basePath: 'MOCK_BASE_PATH',
        externalDocs: {
            description: 'MOCK_externalDocsDescription',
            url: 'MOCK_EXTERNAL_URL'
        },
        getComponent: jest.fn((param) => {
            return param === 'Markdown' ? mockedMarkdownComponent : mockedVersionStampComponent
        })
    };

    const renderComponent = (props=AugmentingInfoProps) => {
        const {container} = render(<AugmentingInfo {...props} />);
        return container;
    }

    it('was rendered', () => {
        const container = renderComponent(AugmentingInfoProps);
        expect(container).toBeTruthy();
    });

});
