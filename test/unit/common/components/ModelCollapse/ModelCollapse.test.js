import React from 'react';
import {render} from '@testing-library/react';
import AugmentingResponses from "components/AugmentingResponses";

describe('<AugmentingResponses/>', ()=>{
    let component;
    const AugmentingResponsesProps = {};
    beforeAll(()=>{
        component = render(<AugmentingResponses {...AugmentingResponsesProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(()=>{
        component = null;
    })

});
