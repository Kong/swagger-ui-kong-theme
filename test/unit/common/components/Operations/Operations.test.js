import React from 'react';
import {render} from '@testing-library/react';
import Operations from "components/Operations";

describe('<Operations/>', () => {
   let component;
    const OperationsProps = {};

   beforeAll(()=>{
       component = render(<Operations {...OperationsProps}/>)
   });

   afterAll(()=>{
       component = null;
   })
});
