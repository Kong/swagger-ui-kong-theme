import React from 'react';
import {render} from '@testing-library/react';
import Operations from "components/Operations";

describe('<Operations/>', () => {
   let component;
    const OperationsProps = {
        specSelectors: undefined,
        getComponent: jest.fn(),
        layoutSelectors: undefined,
        layoutActions: undefined,
        getConfigs: jest.fn(),
        fn: jest.fn()
    };

   beforeAll(()=>{
       component = render(<Operations {...OperationsProps}/>)
   });

   it('was rendered', () => {
       expect(component).toBeInTheDocument();
   });

   afterAll(()=>{
       component = null;
   })
});
