import React from 'react';
import {render, screen} from '@testing-library/react';
import ExamplesSelect from "components/ExamplesSelect";
import user from '@testing-library/user-event';

describe('<ExamplesSelect/>', () => {
    const ExamplesSelectProps = {
        // examples: [
        //     {
        //         example: {
        //             summary: 'example_1_summary',
        //             get: function(val){
        //                 return this[val]
        //             }
        //         },
        //         exampleName: 'example1_name'
        //     },
        //     {
        //         example: {
        //             summary: 'example_2_summary',
        //             get: function(val){
        //                 return this[val]
        //             }
        //         },
        //         exampleName: 'example2_name'
        //     }
        //     ],
        currentExampleKey: null,
        isValueModified: true,
        isModifiedValueAvailable: true,
        showLabels: true,
        onSelect: jest.fn()
    };

    const renderComponent = (props = ExamplesSelectProps) => {
        const {container} = render(<ExamplesSelect {...props}/>);
        return container;
    };

    it('was rendered', () => {
        const container = renderComponent();
        expect(container).toBeInTheDocument();
    });

    it('has default classname `examples-select`', () => {
        const container = renderComponent();
        const el = container.getElementsByClassName(`examples-select`);
        expect(el.length).toEqual(1);
    });

    describe('has `labels` shown', () => {

        it('showLabels section has classname', () => {
            const container = renderComponent();
            const el = container.getElementsByClassName(`examples-select__section-label`);
            expect(el.length).toEqual(1);
        });
    });

    //TODO: fix rendering labels
    xit('no labels content', () => {
        renderComponent({...ExamplesSelectProps, showLabels: false});
        const el = screen.findByLabelText('Examples:');
        expect(el).toBeNull();
    });

    it('has select component with option `__MODIFIED_VALUE__`', () => {
        renderComponent();
        const el = screen.findByLabelText('__MODIFIED__VALUE__');
        expect(el).toBeTruthy();
    });


    //TODO: fix default props values
    xit('select option has rendered values... ', async () => {
        await user.click(screen.getByRole('combobox'));
        const el = screen.getB(ExamplesSelectProps.examples[0].exampleName);
        expect(el).toBeTruthy();
    })

});
