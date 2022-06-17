import React from 'react';
import {render} from '@testing-library/react';
import ModelWrapper from 'src/components/ModelWrapper';

describe('<ModelWrapper/>', () => {
    const ModelWrapperProps = {};

    let component;
    beforeAll(() => {
        component = render(<ModelWrapper {...ModelWrapperProps}/>);
    });
    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });
    afterAll(() => {
        component = null;
    })
});
