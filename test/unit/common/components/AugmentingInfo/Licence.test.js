import React from 'react';
import {render, screen} from '@testing-library/react';
import {Licence} from "components/AugmentingInfo";

describe('<Licence/>', () => {

    describe('`url` property', () => {
        const LicenceProps = {
            licence: {
                name: 'MOCK_NAME',
                url: 'MOCK_URL',
                get: function (val) {
                    return this[val];
                }
            }
        };

        it('renders `url` href link ', () => {
            render(<Licence {...LicenceProps}/>);
            const link = screen.getByRole('link', {name: LicenceProps.licence.name});
            expect(link).toBeInTheDocument();
        });
    });

    describe('`no url` property', () => {

        const NoUrlLicenceProps = {
            licence: {
                name: 'MOCK_NAME',
                url: undefined,
                get: function (val) {
                    return this[val];
                }
            }
        };


        it('renders `no url` href link ', () => {
            render(<Licence {...NoUrlLicenceProps}/>);
            expect(screen.getByText(NoUrlLicenceProps.licence.name)).toBeInTheDocument();
        });


    });

});
