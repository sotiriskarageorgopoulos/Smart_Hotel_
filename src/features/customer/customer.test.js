/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react';
import {
     render
} from '@testing-library/react';
import {CustomerAuth} from './customer';

describe("CustomerAuth component", () => {
    test("check html elements...", () => {
        let { 
            queryByText, 
            container
        } = render(<CustomerAuth />)
        expect(queryByText("Name:")).toBeInTheDocument()
        expect(queryByText("Surname:")).toBeInTheDocument()
        expect(queryByText("Email:")).toBeInTheDocument()
        expect(queryByText("Tel:")).toBeInTheDocument()
        expect(queryByText("Blacklisted:")).toBeInTheDocument()
        expect(queryByText("Bonus Points:")).toBeInTheDocument()
        expect(queryByText("Customer Details")).toBeInTheDocument()
        expect(container.querySelector(".customer-details-box").childElementCount).toBe(8)
    })
})