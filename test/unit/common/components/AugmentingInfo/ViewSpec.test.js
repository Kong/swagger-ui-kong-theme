import React from 'react';
import {render, screen} from '@testing-library/react';
import {ViewSpec} from "components/AugmentingInfo";


describe('<ViewSpec/>', () => {

    beforeEach(() => {
        render(<ViewSpec /> )
    })

    it('was rendered', () => {
      expect(screen.getByText('View Raw')).toBeInTheDocument();
    });

    it('has a button', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has an svg', () => {
        expect(screen.getByTitle('0DC50B50-D286-4889-B1DA-07E43925811F@1.00x')).toBeInTheDocument();
    })

});
