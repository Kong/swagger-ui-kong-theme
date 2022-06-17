import React from 'react';
import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import HighlightCode from 'components/HighlightCode';

describe('<HighlightCode/>', () => {

    const HighlightCodeProps = {
        value: undefined,
        className: undefined,
        fileName: undefined,
        downloadable: undefined
    };


    describe('`downloadable: false`', () => {
        let componentNotDownloadable;
        beforeAll(() => {
            HighlightCodeProps.downloadable = false;
            componentNotDownloadable = render(<HighlightCode {...HighlightCodeProps}/>);
        });

        it('was rendered', () => {
            expect(componentNotDownloadable).toBeVisible();
            expect(componentNotDownloadable).toBeInTheDocument();
        });

        it('has no button `Download`', () => {
            const btnDownload = screen.getByRole('img', {name: 'Download'});
            expect(btnDownload).not.toBeInTheDocument();
        });

        afterAll(() => {
            componentNotDownloadable = null;
        });
    });

    describe('`downloadable: true`', () => {
        let componentDownloadable;
        beforeAll(() => {
            HighlightCodeProps.downloadable = true;
            componentDownloadable = render(<HighlightCode {...HighlightCodeProps}/>);
        })

        it('was rendered', () => {
            expect(componentDownloadable).toBeVisible();
            expect(componentDownloadable).toBeInTheDocument();
        });

        it('has a button `Download`', () => {
            const btnDownload = screen.getByRole('img', {name: 'Download'});
            expect(btnDownload).toBeInTheDocument();
        });

        it('button onClick works', () => {
            const btnDownload = screen.getByRole('img', {name: 'Download'});
            user.click(btnDownload);
        //    TODO: check for download window to appear
        });

        it('has pre component & reacts to scroll', () => {
        //    TODO: trigger scroll event & check if event happened
        })

        afterAll(() => {
            componentDownloadable = null;
        })
    });



});
