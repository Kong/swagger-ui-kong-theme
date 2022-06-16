import React from 'react';
import {render, screen} from '@testing-library/react';
import OperationTag from "components/OperationTag";

describe('<OperationTag/>', () => {
    beforeAll(() => {
        const OperationTagProps = {};
        render(<OperationTag {...OperationTagProps}/>);
    })
})
