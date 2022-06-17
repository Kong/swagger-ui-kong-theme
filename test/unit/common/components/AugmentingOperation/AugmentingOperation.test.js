import React from 'react';
import {render} from '@testing-library/react';
import AugmentingOperation from "components/AugmentingOperation";

describe('<AugmentingOperation/>', ()=>{
    let component;
    const AugmentingOperationProps = {};
    beforeAll(()=>{
        component = render(<AugmentingOperation {...AugmentingOperationProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(()=>{
        component = null;
    })

});
