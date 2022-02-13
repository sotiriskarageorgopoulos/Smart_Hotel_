/**
 * @author Sotirios Karageorgopoulos
 */
import messagesReducer from './features/messages/messagesSlice';
import chatReducer from './features/chat/chatSlice';
import reservationsReducer from './features/reservations/reservationsSlice'
import reviewsReducer from './features/reviews/reviewsSlice';
import roomsReducer from './features/rooms/roomsSlice';
import profileDetailsReducer from './features/profile/profileDetailsSlice';
import customerResReducer from './features/customer_main/customerSlice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
      customerRes: customerResReducer,
      senders: messagesReducer,
      profileDetails: profileDetailsReducer,
      chat: chatReducer,
      reservations: reservationsReducer,
      reviews: reviewsReducer,
      rooms: roomsReducer
    }
})