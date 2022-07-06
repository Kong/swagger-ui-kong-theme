import React from 'react';
import {render} from '@testing-library/react';
import InfoAlert from "components/InfoAlertMessage";


describe('<InfoAlert', () => {
   const InfoAlertProps = {
       type: "info",
       msg: 'MOCK_MESSAGE'
   };

    const renderComponent = (props = InfoAlertProps) => {
        const {container} = render(<InfoAlert {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });
});
