import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import HighlightCode from 'components/HighlightCode';
import user from "@testing-library/user-event";

describe('<HighlightCode/>', () => {

    const HighlightCodeProps = {
        value: 'MOCK_VALUE',
        className: 'MOCK_CLASSNAME',
        fileName: 'MOCK_FILENAME',
        downloadable: undefined
    };

    describe('downloadable: false', () => {

        it('has no content', () => {
            HighlightCodeProps.downloadable = false;
            const {container} = render(<HighlightCode {...HighlightCodeProps}/>);
            const el = container.getElementsByClassName(`download-contents`);
            expect(el.length).toEqual(0);
        });

    });

    describe('downloadable: true', () => {
        let btn;
        beforeEach(() => {
            HighlightCodeProps.downloadable = true;
            render(<HighlightCode {...HighlightCodeProps}/>);
            btn = screen.getByRole('button');
        });

        it('has been rendered', () => {
            expect(btn).toBeInTheDocument();
            expect(btn).toBeVisible()
        });

        it('has a button text', () => {
            const displayedText = screen.getByText(HighlightCodeProps.value);
            expect(displayedText).toBeTruthy();
        });


        it('has classname `download-contents`', () => {
            const {container} = render(<HighlightCode {...HighlightCodeProps}/>);
            const el = container.getElementsByClassName(`download-contents`);
            expect(el).toBeTruthy();
        });

        it('has aria label: `download contents`', () => {
            const ariaText = screen.getByLabelText('download contents');
            expect(ariaText).toBeTruthy();
        });
        //uncomment when saveAsIxFixed
        xit('fires action on btn click', async () => {
        jest.mock('js-file-download', () => ({saveAs: jest.fn()}));
        const fileSave = require('js-file-download');
            global.URL.createObjectURL = jest.fn();
            await user.click(btn);
            expect(fileSave.saveAs).toBeCalled();
        });

    })

    describe('`pre` element', () => {
        let element;
        beforeEach(() => {
            element = render(<HighlightCode {...HighlightCodeProps}/>);
        });

        it('was rendered', () => {
            expect(element).not.toBeUndefined();
        });

        it('has default text value displayed', () => {
            const displayedText = screen.getByText(HighlightCodeProps.value);
            expect(displayedText).toBeInTheDocument();
        });

        it('has correct classname', () => {
            const {container} = render(<HighlightCode {...HighlightCodeProps}/>);
            const el = container.getElementsByClassName(`${HighlightCodeProps.className} microlight`);
            expect(el).toBeTruthy();
        });
    });

});
