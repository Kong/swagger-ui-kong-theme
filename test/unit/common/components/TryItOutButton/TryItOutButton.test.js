import React from 'react';
import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import TryItOutButton from 'components/TryItOutButton';


describe('<TryItOutButton/>', () => {
    const onTryOutClickMock = jest.fn();
    const onCancelClickMock = jest.fn();

    describe('enabled: false', () => {
        let tryOutBtn;
        beforeEach(() => {
            render(<TryItOutButton onTryoutClick={onTryOutClickMock} onCancelClick={onCancelClickMock} enabled={false}/>);
            tryOutBtn = screen.getByRole('button');
        });

        it('was rendered', () => {
            expect(tryOutBtn).toBeVisible();
            expect(tryOutBtn).toBeInTheDocument();
        });

        it('has an aria label text: `Try sending an example request`', () => {
            const text = screen.getByLabelText('Try sending an example request');
            expect(text).toBeTruthy();
        })

        it('tryOutButton functionality', async () => {
            await user.click(tryOutBtn);
            expect(onTryOutClickMock).toHaveBeenCalledTimes(1);
        });

    });


    describe('`enabled: true`', () => {
        let cancelBtn;
        beforeEach(() => {
            render(<TryItOutButton onTryoutClick={onTryOutClickMock} onCancelClick={onCancelClickMock} enabled={true}/>);
            cancelBtn = screen.getByRole('button');
        });

        it('was rendered', () => {
            expect(cancelBtn).toBeVisible();
            expect(cancelBtn).toBeInTheDocument();
        });

        it('has an aria label text: `Cancel sending an example request`', () => {
            const text = screen.getByLabelText('Cancel sending an example request');
            expect(text).toBeTruthy();
        })

        it('tryOutButton functionality', async () => {
            await user.click(cancelBtn);
            expect(onCancelClickMock).toHaveBeenCalledTimes(1);
        });
    });
});
