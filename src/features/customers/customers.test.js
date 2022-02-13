/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react';
import {
        render
} from '@testing-library/react';

import {CustomerAuth} from './customers';

describe('CustomerAuth', () => {
    test('checking the html elements', () => {
        let { 
            queryByText
        }=render(<CustomerAuth />)

        expect(queryByText("email:")).toBeInTheDocument();
        expect(queryByText("tel:")).toBeInTheDocument();
    })
})
