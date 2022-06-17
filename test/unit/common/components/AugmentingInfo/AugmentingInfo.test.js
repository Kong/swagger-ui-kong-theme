import React from 'react';
import {render} from '@testing-library/react';
import AugmentingInfo from "components/AugmentingInfo";

describe('<AugmentingInfo/>', () => {
    const AugmentingInfoProps = {};
    let component;
    beforeAll(()=> {
        component = render(<AugmentingInfo {...AugmentingInfoProps}/>);
    })

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(() => {
        component = null;
    })
});
