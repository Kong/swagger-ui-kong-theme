import React from 'react';
import {render, screen} from '@testing-library/react';
import {Licence} from "components/AugmentingInfo";

describe('<Licence/>', () => {

    describe('`url` property', () => {
        const LicenceProps = {
            name: 'MOCK_LICENCE',
            url: 'MOCK_URL',
            size: 'MOCK_SIZE',
            get: function (val) {
                return this[val]
            },
        };

        it('renders `url` href link ', () => {
            render(<Licence data={{...LicenceProps}}/>);
            const link = screen.getByRole('link', {name: LicenceProps.name});
            expect(link).toBeInTheDocument();
        });
    });

    describe('`no url` property', () => {

        const NoUrlLicenceProps = {
                name: 'MOCK_NAME',
                url: undefined,
                get: function (val) {
                    return this[val];
                }
        };


        it('renders `no url` href link ', () => {
            render(<Licence data={{...NoUrlLicenceProps}}/>);
            expect(screen.getByText(NoUrlLicenceProps.name)).toBeInTheDocument();
        });


    });

});
