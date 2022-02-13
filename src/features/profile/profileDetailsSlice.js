/**
 * @author Sotirios Karageorgopoulos
 */
import {createSlice} from '@reduxjs/toolkit'

const initialStateValue = {
    password: "",
    surname: "",
    image: "",
    blackListed: false,
    birthDate: "",
    name: "",
    bonusPoints: 0,
    tel: "",
    email: "",
    nationality: "",
    userId: ""
}

const profileDetailsSlice = createSlice({
    name: "profileDetails",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        setProfileDetails: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setProfileDetails} = profileDetailsSlice.actions
export default profileDetailsSlice.reducer