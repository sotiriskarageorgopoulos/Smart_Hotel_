/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react';
import {
    render
} from '@testing-library/react';
import {
    AdminMainAuth
} from './admin_main';

describe("AdminMainAuth Component", () => {
    test("check html elements...", () => {
        let {
            queryAllByText,
            queryByText,
            queryByLabelText
        } = render(< AdminMainAuth />)
        expect(queryByLabelText('room id')).toBeInTheDocument()
        expect(queryAllByText('price')[0]).toBeInTheDocument()
        expect(queryAllByText('price')[1]).toBeInTheDocument()
        expect(queryByText('room type')).toBeInTheDocument()
        expect(queryByText('description')).toBeInTheDocument()
        expect(queryByText('capacity')).toBeInTheDocument()
        expect(queryByText('size')).toBeInTheDocument()
        expect(queryByText('availability')).toBeInTheDocument()
        expect(queryByText('discount')).toBeInTheDocument()
        expect(queryByText('Change Room Price')).toBeInTheDocument()
        expect(queryByText('Add Room')).toBeInTheDocument()
        expect(queryByText('Services')).toBeInTheDocument()
    })
})