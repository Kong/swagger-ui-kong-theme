import React from 'react';
import {render, screen} from '@testing-library/react';
import ModelWrapper from "components/ModelWrapper";

describe('<Operations/>', () => {
    const OperationsProps = {};

    beforeAll(()=>{
        render(<ModelWrapper {...OperationsProps}/>)
    })
});
