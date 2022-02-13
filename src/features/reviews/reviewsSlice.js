/**
 * @author Sotirios Karageorgopoulos
 */
import {createSlice} from '@reduxjs/toolkit';

const initialStateValue = [{
    comment: "",
    date:"",
    rating: 0,
    reviewId: "",
    userId: "",
    name: "",
    surname: "",
    image: ""
}]

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        setReviews: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setReviews} = reviewsSlice.actions
export default reviewsSlice.reducer