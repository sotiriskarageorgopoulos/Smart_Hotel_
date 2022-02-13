/**
 * @author Sotirios Karageorgopoulos
 */
import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = [{
    availability: "",
    capacity: 0,
    description: "",
    image:"",
    price: 0,
    roomId: "",
    services:[""],
    size: 0,
    type: ""
}]

const roomsSlice = createSlice({
    name:"rooms",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        setRooms: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setRooms} = roomsSlice.actions
export default roomsSlice.reducer