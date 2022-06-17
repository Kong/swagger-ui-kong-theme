import React from 'react';
import {render} from '@testing-library/react';
import ModelCollapse from "components/ModelCollapse";

describe('<ModelCollapse/>', ()=>{
    let component;
    const ModelCollapseProps = {
        title: 'Model Collapse title mock',
        classes: undefined,
        expanded: undefined,
        collapsedContent: undefined,
        onToggle: jest.fn(),
        modelName: undefined,
        hideSelfOnExpand: jest.fn(),
        children: undefined,
    };
    beforeAll(()=>{
        component = render(<ModelCollapse {...ModelCollapseProps}/>);
    });

    it('was rendered', () => {
        expect(component).toBeInTheDocument();
    });

    afterAll(()=>{
        component = null;
    })

});
