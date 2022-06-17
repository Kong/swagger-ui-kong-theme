import React from 'react';
import {render} from '@testing-library/react';
import OperationTag from "components/OperationTag";

describe('<OperationTag/>', () => {
    let component;

    beforeAll(() => {
        const OperationTagProps = {};
        render(<OperationTag {...OperationTagProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    })

    afterAll(()=>{
        component = null;
    })
})
