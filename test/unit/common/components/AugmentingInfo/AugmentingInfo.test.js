import React from 'react';
import {render} from '@testing-library/react';
import AugmentingInfo from "components/AugmentingInfo";

describe('<AugmentingInfo/>', () => {
    const AugmentingInfoProps = {
        info: undefined,
        url:undefined,
        basePath:undefined,
        host:undefined,
        getComponent: jest.fn(),
        externalDocs: undefined
    };
    let component;
    beforeAll(()=> {
        component = render(<AugmentingInfo {...AugmentingInfoProps}/>);
    })

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(() => {
        component = null;
    })
});
