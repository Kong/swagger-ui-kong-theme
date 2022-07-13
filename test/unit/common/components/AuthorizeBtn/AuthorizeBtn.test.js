import React from 'react';
import {render} from '@testing-library/react';
import AuthorizeBtn from "components/AuthorizeBtn";


describe('<AuthorizeBtn', () => {

    const mockedAuthorizationPopup = () => <div>Mocked Authorization Pop Up Component</div>;

    const AuthorizeBtnProps = {
        isAuthorized: true,
        showPopup: false,
        onClick: jest.fn(),
        getComponent: jest.fn((param, bool) => {
            if (param === 'parameterRow' && bool) {
                return mockedAuthorizationPopup;
            }
        })
    };

    const renderComponent = (props = AuthorizeBtnProps) => {
        const {container} = render(<AuthorizeBtn {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });
});
