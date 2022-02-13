/**
 * @author Sotirios Karageorgopoulos
 */
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Statistics from '../features/statistics/statistics'
import AdminMain from '../features/admin_main/admin_main'
import CustomerMain from '../features/customer_main/customer_main'
import Customers from '../features/customers/customers'
import Login from '../features/login/login'
import Profile from '../features/profile/profile'
import ReceptionistMain from '../features/receptionist_main/receptionist_main'
import Register from '../features/register/register'
import ReservationHistory from '../features/reservation_history/reservation_history'
import Navbar from '../features/navbar/navbar'
import Footer from '../features/footer/footer'
import Reservations from '../features/reservations/reservations'
import Error404 from '../features/error404/error404'
import Rooms from '../features/rooms/rooms'
import Reviews from '../features/reviews/reviews'
import Messages from '../features/messages/messages'
import Chat from '../features/chat/chat'
import Customer from '../features/customer/customer'
import UpdateRoomDetails from '../features/update_room_details/update_room_details'
import CustomerReservation from '../features/customer_reservation/customer_reservation'
import HotelReservationHistory from '../features/hotel_reservation_history/hotel_reservation_history'

const RoutingSetup = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/customer_main" element={<CustomerMain />} />
                <Route exact path="/customer_reservation" element={<CustomerReservation />} />
                <Route exact path="/admin_main" element={<AdminMain />} />
                <Route exact path="/rooms" element={<Rooms />} />
                <Route exact path="/reservations" element={<Reservations />} />
                <Route exact path="/chat/:senderId" element={<Chat />} />
                <Route exact path="/customer/:userId" element={<Customer />} /> 
                <Route exact path="/reservation_history" element={<ReservationHistory />} />
                <Route exact path="/receptionist_main" element={<ReceptionistMain />} />
                <Route exact path="/statistics" element={<Statistics />} />
                <Route exact path="/update_room_details/:roomId" element={<UpdateRoomDetails />} />
                <Route exact path="/hotel_reservation_history" element={<HotelReservationHistory />}/>
                <Route exact path="/messages" element={<Messages />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/customers" element={<Customers />} />
                <Route exact path="/reviews" element={<Reviews />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default RoutingSetup
