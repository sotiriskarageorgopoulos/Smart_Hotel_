/**
 * @author Sotirios Karageorgopoulos
 */
import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = []

const customerSlice = createSlice({
    name: "customerRes",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        setCustomerRes: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setCustomerRes} = customerSlice.actions
export default customerSlice.reducer