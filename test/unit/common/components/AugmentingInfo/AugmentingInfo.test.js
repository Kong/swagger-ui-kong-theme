import React from 'react';
import {render, screen} from '@testing-library/react';
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

    it('has className `info`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(`info`);
        expect(el.length).toEqual(1);
    });

    it('has className `main`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(`main`);
        expect(el.length).toEqual(1);
    });

    it('has className `header`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(`header`);
        expect(el.length).toEqual(1);
    });

    it('has className `title`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(`title`);
        expect(el.length).toEqual(1);
    });

    it('`title` prop is passed', () => {
        renderComponent();
        const el = screen.getByText(AugmentingInfoProps.info.title);
        expect(el).toBeInTheDocument();
    });

    it('`Version Stamp` component rendered', () => {
        renderComponent();
        const el = screen.getByText('Mocked Version Stamp Component');
        expect(el).toBeInTheDocument();
    })

    it('`ViewSpec` component is rendered', () => {
        renderComponent();
        const el = screen.getByText('View Raw');
        expect(el).toBeInTheDocument();
        expect(screen.getByTitle('0DC50B50-D286-4889-B1DA-07E43925811F@1.00x')).toBeInTheDocument();
    });

    it('has `host path` element', () => {
        const container = renderComponent(AugmentingInfoProps);
        const el = container.getElementsByClassName(`base-url`);
        expect(el).toBeTruthy();
    });

    describe('`url` section rendered', () => {

        it('has `url` text', () => {
            renderComponent(AugmentingInfoProps);
            const el = screen.getByText(AugmentingInfoProps.url);
            expect(el).toBeTruthy();
        });

        it('has `a href` link', () => {
            renderComponent();
            expect(screen.getByText(AugmentingInfoProps.url).closest('a')).toBeTruthy();
        });

        describe('`description` section', () => {
            it('it has `description` classname', () => {
                const container = renderComponent(AugmentingInfoProps);
                const el = container.getElementsByClassName(`title`);
                expect(el).toBeTruthy();
            });
            it('has `Markdown` component rendered', () => {
                renderComponent(AugmentingInfoProps);
                const el = screen.getByText("Mocked Markdown Component");
                expect(el).toBeTruthy();
            });

            describe('`terms of service` section', () => {
                it('contains text `Terms of service`', () => {
                    renderComponent(AugmentingInfoProps);
                    expect(screen.getByText('Terms of service')).toBeInTheDocument();
                });

                it('contains `href`', () => {
                    renderComponent();
                    expect(screen.getByText('Terms of service').closest('a')).toBeTruthy();
                });
            });

            it('has rendered `contact` section', () => {
                renderComponent();
                const el = screen.getByText(`${AugmentingInfoProps.info.contact.name} - Website`);
                expect(el).toBeInTheDocument();
            });

            it('has rendered `licence` section', () => {
                renderComponent();
                const el = screen.getByText(AugmentingInfoProps.info.licence.name);
                expect(el).toBeInTheDocument();
            });

            describe('`externalDocsUrl` section', () => {
                let el;
                beforeEach(() => {
                    renderComponent(AugmentingInfoProps);
                    el = screen.getByText(AugmentingInfoProps.externalDocs.description);
                })

                it('has externalDocs rendered', () => {
                    const el = screen.getByText(AugmentingInfoProps.externalDocs.description);
                    expect(el).toBeInTheDocument();
                });

                it('has `href` link', () => {
                    expect(el.closest('a')).toBeTruthy();
                })
            })
        })
    });

});
