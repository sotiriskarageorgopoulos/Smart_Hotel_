/**
 * @author Sotirios Karageorgopoulos
 */
import {
    createSlice
} from '@reduxjs/toolkit';

const sendersValue = [{
    image: "",
    name: "",
    surname: "",
    userId: "",
    text: "",
    date: ""
}]

export const messagesSlice = createSlice({
    name: "senders",
    initialState: {
        value: sendersValue
    },
    reducers: {
        setSenders: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setSenders} = messagesSlice.actions
export default messagesSlice.reducer