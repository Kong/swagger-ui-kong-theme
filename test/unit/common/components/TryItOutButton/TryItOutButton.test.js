import React from 'react';
import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import TryItOutButton from 'components/TryItOutButton';

describe('<TryItOutButton/>', () => {
    const onTryOutClickMock = jest.fn();
    const onCancelClickMock = jest.fn();

    describe('enabled: false', () => {
        beforeEach(() => {
            render(<TryItOutButton onTryoutClick={onTryOutClickMock} onCancelClick={onCancelClickMock} enabled={false}/>);
        });

        it('was rendered', () => {
            const tryOutBtn = screen.getByRole('button');
            expect(tryOutBtn).toBeVisible();
        });

        it('tryOutButton functionality', async () => {
            const tryOutBtn = screen.getByRole('button');
            expect(tryOutBtn).toBeInTheDocument();
            expect(tryOutBtn).toBeVisible();
            await user.click(tryOutBtn);
            expect(onTryOutClickMock).toHaveBeenCalledTimes(1);
        });

    });
});


    describe('`enabled: true`', () => {
        beforeAll(() => {
            render(<TryItOutButton onTryoutClick={onTryOutClickMock} onCancelClick={onCancelClickMock}
                                   enabled={false}/>);
        });

        it('was rendered', () => {
            expect(screen).toBeVisible();
        });

        it('tryOutButton functionality', () => {
            const cancelBtn = screen.getByRole('img', {name: 'Cancel'});
            expect(cancelBtn).toBeInTheDocument();
            expect(cancelBtn).toBeVisible();
            user.click(cancelBtn);
            expect(onCancelClickMock).toHaveBeenCalledTimes(1);
        });
    });
});
