/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react';
import {
     render
} from '@testing-library/react';

import {ChatAuth} from './chat.js';
import { Provider } from 'react-redux'
import {store} from '../../reduxStore';

describe("ChatAuth Component", () => {
    test("check html elements...", () => {
        let {
            queryByText,
            container
        } = render(<Provider store={store}><ChatAuth /></Provider>)
        expect(queryByText("Chat")).toBeInTheDocument()
        expect(container.childElementCount).toBeGreaterThan(0)
    })
})