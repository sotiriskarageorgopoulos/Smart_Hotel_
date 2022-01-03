/**
* @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
*/
const functions = require("firebase-functions");
const express = require("express");
const app = express();
const {
    login,
    getAvailableRooms,
    getRoomsByCategory,
    getRooms,
    getRoom,
    getRoomsUntilPrice,
    sendMessage,
    getMessage,
    updateProfileDetails,
    deleteReview,
    postReservationDecision,
    getBlackListedCustomer,
    getAllReservationsOfHotel,
    getReservationOfHotel,
    getReviews,
    getReview,
} = require("./handlers/users")

const {
    register,
    doReservation,
    cancelReservation,
    postReview,
    updateReview,
    getReservationsOfCustomer,
    getReservationOfCustomer,
    getCustomerBonus,
    updateCustomerBonus
} = require("./handlers/customer")

const { 
    postNotesAboutReservation
} = require("./handlers/receptionist")

const {
    updateRoomPrice,
    updateRoomPriceWithDiscount,
    updateRoomReservation,
    doUnavailableRoom,
    postRoom,
    deleteRoom,
    updateRoomDetails,
    postBlacklistedCustomer,
    removeBlacklistedCustomer
} = require("./handlers/administrator")

const { 
    getReservationsByDay,
    getIncomeByDay,
    getRoomWithMaxReservations,
    getReservationsByMonth,
    getNumberOfCustomersByNationality,
    getMostDemandRooms
} = require("./handlers/statistics")

//statistics routes
app.get("/reservationsByDay",getReservationsByDay)
app.get("/incomeByDay",getIncomeByDay)
app.get("/roomWithMaxReservations",getRoomWithMaxReservations)
app.get("/reservationsByMonth",getReservationsByMonth)
app.get("/numberOfCustomersByNationality",getNumberOfCustomersByNationality)
app.get("/mostDemandRooms/:number",getMostDemandRooms)

//administrator routes
app.update('/updateRoomPrice/:roomId',updateRoomPrice)
app.update('/updateRoomPriceWithDiscount/:roomId',updateRoomPriceWithDiscount)
app.update('/updateRoomReservation/:roomId',updateRoomReservation)
app.update('/doUnavailableRoom/:roomId',doUnavailableRoom)
app.post('/room',postRoom)
app.post('/deleteRoom/:roomId',deleteRoom)
app.update('/updateRoomDetails/:roomId',updateRoomDetails)
app.post('/postBlacklistedCustomer/:userId',postBlacklistedCustomer)
app.update('/removeBlacklistedCustomer/:userId',removeBlacklistedCustomer)

//users routes
app.get('/login',login)
app.get('/availableRooms',getAvailableRooms)
app.get('/roomUntilPrice/:price',getRoomUntilPrice)
app.get('/getMessage/:receiver',getMessage)
app.get('/rooms',getRooms)
app.get('/room/:roomId',getRoom)
app.get('/reviews',getReviews)
app.get('/review/:revId',getReview)
app.get('/getBlackListedCustomer/:userId',getBlackListedCustomer)
app.get('/getAllReservationsOfHotel',getAllReservationsOfHotel)
app.get('/getReservationOfHotel/:resId',getReservationOfHotel)
app.get('/getRoomsByCategory/:category',getRoomsByCategory)
app.get('/getRoomsUntilPrice/:price',getRoomsUntilPrice)
app.post('/sendMessage',sendMessage)
app.post('/postReservationDecision/:resId',postReservationDecision)
app.put('/updateProfileDetails/:userId',updateProfileDetails)
app.delete('/deleteReview/:revId',deleteReview)

//customers routes
app.get('/reservations/:userId',getReservationsOfCustomer)
app.get('/reservation/:resId/:userId',getReservationOfCustomer)
app.get('/getCustomerBonus/:userId',getCustomerBonus)
app.post('/postReview',postReview)
app.post('/reservation/:roomId',doReservation)
app.post('/register',register)
app.update('/updateReview/:revId',updateReview)
app.update('/updateCustomerBonus/:userId',updateCustomerBonus)
app.delete('/cancelReservation/:resId',cancelReservation)

//receptionist routes
app.post('/postNotesAboutReservation/:resId',postNotesAboutReservation)

exports.api = functions.region("europe-west6").https.onRequest(app)