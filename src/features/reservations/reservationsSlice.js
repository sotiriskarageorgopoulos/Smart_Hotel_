/**
 * @author Sotirios Karageorgopoulos
 */
import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = [{
    customerNotes: "",
    decision: "pending",
    duration: 0,
    resDate: "",
    roomsIds: [],
    totalPrice: 0,
    userId: "",
    reservationId: ""
}]

const reservationsSlice = createSlice({
    name: "reservations",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        setReservations: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setReservations} = reservationsSlice.actions
export default reservationsSlice.reducer
