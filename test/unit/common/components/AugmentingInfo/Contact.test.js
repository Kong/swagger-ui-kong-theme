import React from 'react';
import {render, screen} from '@testing-library/react';
import {Contact} from "components/AugmentingInfo";

describe('<Contact/>', () => {
    const ContactProps = {
        data: {
            name: 'MOCK_NAME',
            url: 'MOCK_URL',
            email: 'MOCK_EMAIL',
            get: function (val) {
                return this[val];
            }
        }
    };

    // const renderComponent = (contactProps) => {
    //     const {container} = render(<Contact {...contactProps}/>);
    //     return container;
    // };

    describe('`url` property', () => {
        beforeEach(() => {
            render(<Contact {...ContactProps}/>);
        })

        it('contains `url link`', () => {
            // renderComponent();
            const el = screen.getByText(`${ContactProps.data.name} - Website`);
            expect(el).toBeInTheDocument();
        });

        it('renders `url` href link ', () => {
            // renderComponent(ContactProps);
            expect(screen.getByText(`Send email to ${ContactProps.data.name}`).closest('a')).toHaveAttribute('href', `mailto:${ContactProps.data.email}`)
        });
    })

    describe('no `url` property', () => {
        let NoUrlPropertyProps;
        beforeEach(() => {
            NoUrlPropertyProps = {...ContactProps};
            NoUrlPropertyProps.data.url = undefined;
            render(<Contact {...NoUrlPropertyProps}/>);
        })

        it('no url link', () => {
            const el = screen.getByText(`Contact ${NoUrlPropertyProps.data.name}`);
            expect(el).toBeTruthy();
        });

        it('renders `no url` href link ', () => {
            expect(screen.getByText(`Contact ${ContactProps.data.name}`).closest('a')).toHaveAttribute('href', `mailto:${ContactProps.data.email}`)
        });
    });

});
