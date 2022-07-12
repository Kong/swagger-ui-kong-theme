import React from 'react';
import {render, screen} from '@testing-library/react';
import {ViewSpecBtn} from "components/AugmentingInfo";


describe('<ViewSpecBtn/>', () => {

    beforeEach(() => {
        render(<ViewSpecBtn /> )
    })

    it('was rendered', () => {
      expect(screen.getByText('View Raw')).toBeInTheDocument();
    });

    it('has a button', () => {
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

});
