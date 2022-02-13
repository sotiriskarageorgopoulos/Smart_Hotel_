/**
 * @author Sotirios Karageorgopoulos
 */
import {
    createSlice
} from '@reduxjs/toolkit';

const chatValue = [{
    text: "",
    isRead: false,
    senderId: "",
    date: "",
    receiverId: "",
},
{
    text: "",
    isRead: false,
    senderId: "",
    date: "",
    receiverId: "",
},]

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        value: chatValue
    },
    reducers: {
        setChat: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setChat} = chatSlice.actions 
export default chatSlice.reducer

