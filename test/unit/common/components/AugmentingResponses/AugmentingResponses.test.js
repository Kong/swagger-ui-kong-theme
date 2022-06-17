import React from 'react';
import {render} from '@testing-library/react';
import AugmentingResponses from "components/AugmentingResponses";

describe('<AugmentingResponses/>', ()=>{
    let component;
    const AugmentingResponsesProps = {
        system: undefined,
        specSelectors: undefined,
        getConfigs: jest.fn(),
        tryItOutResponse: undefined,
        responses: undefined,
        produces: undefined,
        producesValue: undefined,
        displayRequestDuration: undefined,
        path: undefined,
        method: undefined
    };

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
