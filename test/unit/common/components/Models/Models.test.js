import React from 'react';
import {render} from '@testing-library/react';
import Models from "components/Models";

describe('<Models/>', ()=>{
    let component;
    const ModelsProps = {
        specSelectors: undefined,
        getComponent: jest.fn(),
        layoutSelectors: undefined,
        getConfigs: jest.fn(),
        specActions: undefined
    };
    beforeAll(()=>{
        component = render(<Models {...ModelsProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(()=>{
        component = null;
    })

});
