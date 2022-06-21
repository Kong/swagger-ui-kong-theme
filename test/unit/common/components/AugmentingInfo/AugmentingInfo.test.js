import React from 'react';
import {render, screen} from '@testing-library/react';
import AugmentingInfo from 'components/AugmentingInfo';

describe('<AugmentingInfo/>', () => {
    const AugmentingInfoProps = {
        info: {
            version: 'MOCK_VERSION',
            description: 'MOCK_DESCRIPTION',
            title: 'MOCK_TITLE',
            termsOfService: 'MOCK_TERMS_OF_SERVICE',
            contact: 'MOCK_CONTACT',
            licence: 'MOCK_LICENCE',
            get: function (property) {
                return this[property]
            }
        },
        url: 'MOCK_URL',
        basePath: 'MOCK_BASE_PATH',
        externalDocsDescription: 'MOCK_externalDocsDescription',
        getComponent: jest.fn()
    };

    const renderComponent = (props) => {
        const {container} = render(<AugmentingInfo {...props} />);
        return container;
    }

    it('was rendered', () => {
        const container = renderComponent(AugmentingInfoProps);
        expect(container).toBeTruthy();
    });

    it('has className `info`', () => {
        const container = renderComponent(AugmentingInfoProps);
        const el = container.getElementsByClassName(`info`);
        expect(el.length).toEqual(1);
    });

    it('has className `main`', () => {
        const container = renderComponent(AugmentingInfoProps);
        const el = container.getElementsByClassName(`main`);
        expect(el.length).toEqual(1);
    });

    it('has className `header`', () => {
        const container = renderComponent(AugmentingInfoProps);
        const el = container.getElementsByClassName(`header`);
        expect(el.length).toEqual(1);
    });

    it('has className `title`', () => {
        const container = renderComponent(AugmentingInfoProps);
        const el = container.getElementsByClassName(`title`);
        expect(el.length).toEqual(1);
    });

    it('`title` prop is passed', () => {
        renderComponent(AugmentingInfoProps);
        const el = screen.getByText(AugmentingInfoProps.info.title);
        expect(el).toBeInTheDocument();
    });

    it('`ViewSpec` component is rendered', () => {
       renderComponent(AugmentingInfoProps);
        const el = screen.getByText('View Raw');
        expect(el).toBeInTheDocument();
        expect(screen.getByTitle('0DC50B50-D286-4889-B1DA-07E43925811F@1.00x')).toBeInTheDocument();
    });

    it('has `host path` element', () => {
        const container = renderComponent(AugmentingInfoProps);
        const el = container.getElementsByClassName(`base-url`);
        expect(el).toBeTruthy();
    });

    it('`url` section rendered', () => {
    });

});
