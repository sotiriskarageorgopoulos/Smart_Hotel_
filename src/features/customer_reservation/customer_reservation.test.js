/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react';
import {
       render
} from '@testing-library/react';
import {CustomerReservationAuth} from './customer_reservation';
import { Provider } from 'react-redux'
import {store} from '../../reduxStore';

describe("CustomerMainAuth component", () => {
    test("checking html elements...", () => {
        let { 
            queryByText
        }=render(<Provider store={store}><CustomerReservationAuth /></Provider>)

        expect(queryByText("Make Reservation")).toBeInTheDocument();
        expect(queryByText("id")).toBeInTheDocument();
        expect(queryByText("date")).toBeInTheDocument();
        expect(queryByText("days")).toBeInTheDocument();
        expect(queryByText("notes")).toBeInTheDocument();
    })
})