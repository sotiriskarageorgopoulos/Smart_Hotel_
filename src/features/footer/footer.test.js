/**
 * @author Sotirios Karageorgopoulos
 */
 import React from 'react';
 import {
        render
 } from '@testing-library/react';
 import Footer from './footer';

describe("Footer component", () => {
    test("checking html elements...", () => {
        let { 
            queryByText,
            container
        }=render(<Footer />)

        expect(queryByText("Address")).toBeInTheDocument()
        expect(queryByText("361637167136713")).toBeInTheDocument()
        expect(queryByText("smarthotel@domain.com")).toBeInTheDocument()
        expect(queryByText("© Copyright "+new Date().getFullYear())).toBeInTheDocument()
    })
})
 