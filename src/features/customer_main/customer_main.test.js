/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react';
import {
      render
} from '@testing-library/react';
 
import {CustomerMainAuth} from './customer_main';
import { Provider } from 'react-redux'
import {store} from '../../reduxStore';

describe("CustomerMainAuth component", () => {
    test("checking html elements...", () => {
        let { 
            queryAllByText,
            container,
            queryByText
        }=render(<Provider store={store}><CustomerMainAuth /></Provider>)

        expect(queryAllByText('Search')[0]).toBeInTheDocument()
        expect(queryAllByText('Search')[1]).toBeInTheDocument()
        expect(container.getElementsByClassName("room-desc")[0].childElementCount).toBeGreaterThanOrEqual(4)
        expect(queryByText("Make Reservation")).toBeInTheDocument()
        expect(queryByText('price')).toBeInTheDocument()
        expect(queryByText('date')).toBeInTheDocument()
        expect(queryByText('room type')).toBeInTheDocument()
    })
})  

 
 