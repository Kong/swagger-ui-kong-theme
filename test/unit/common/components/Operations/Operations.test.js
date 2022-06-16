import React from 'react';
import {render, screen} from '@testing-library/react';
import Operations from "components/Operations";

describe('<Operations/>', () => {
   const OperationsProps = {};

   beforeAll(()=>{
       render(<Operations {...OperationsProps}/>)
   })
});
