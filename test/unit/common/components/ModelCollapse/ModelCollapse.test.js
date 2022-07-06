import React from 'react';
import {render} from '@testing-library/react';
import ModelCollapse from "components/ModelCollapse";

describe('<ModelCollapse />', () => {
    const ModelCollapseProps = {
        title: 'MOCK_TITLE',
        classes: 'MOCK_CLASSES' ,
        expanded: false,
        collapsedContent: true,
        onToggle: jest.fn(),
        modelName: 'MOCK_MODEL',
        hideSelfOnExpand: false,
        children: null,
    };

    const renderComponent = (props = ModelCollapseProps) => {
        const {container} = render(<ModelCollapse {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });
})
