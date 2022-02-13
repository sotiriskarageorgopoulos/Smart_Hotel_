/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
const {
    login,
    getRooms,
    getRoom,
    sendMessage,
    getMessages,
    updateProfileDetails,
    deleteReview,
    updateReservationDecision,
    getCustomer,
    getAllReservationsOfHotel,
    getReservationOfHotel,
    getReviews,
    getReview,
    getSenders,
    updIsReadMessages,
    getUser,
    getReservationHistoryOfHotel,
    checkAvailabilityOfRooms
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
    updateCustomerBonus,
    getRoomsByType,
    getRoomsUntilPrice,
    getAvailableRooms,
    getAvailableRoomsByDate
} = require("./handlers/customer")

const {
    postNotesAboutReservation,
    getNotesAboutReservation,
    deleteNotesAboutReservation
} = require("./handlers/receptionist")

const {
    updateRoomPrice,
    updateRoomPriceWithDiscount,
    upgradeRoomReservation,
    changeRoomAvailability,
    postRoom,
    deleteRoom,
    updateRoomDetails,
    postBlacklistedCustomer,
    removeBlacklistedCustomer,
    getAllCustomers,
    addService,
    deleteService
} = require("./handlers/administrator")

const {
    getReservationsByDate,
    getIncomeByDate,
    getRoomWithMaxReservations,
    getReservationsByMonth,
    getNumberOfCustomersByNationality,
    getMostDemandRooms
} = require("./handlers/statistics")

//statistics routes
app.get("/reservationsByDate", getReservationsByDate)
app.get("/incomeByDate", getIncomeByDate)
app.get("/roomWithMaxReservations", getRoomWithMaxReservations)
app.get("/reservationsByMonth", getReservationsByMonth)
app.get("/numberOfCustomersByNationality", getNumberOfCustomersByNationality)
app.get("/mostDemandRooms/:number", getMostDemandRooms)

//administrator routes
app.put('/updateRoomPrice/:roomId', updateRoomPrice)
app.put('/updateRoomPriceWithDiscount/:roomId', updateRoomPriceWithDiscount)
app.put('/upgradeRoomReservation/:reservationId/:updRoomId', upgradeRoomReservation)
app.put('/changeRoomAvailability/:roomId', changeRoomAvailability)
app.post('/room', postRoom)
app.delete('/deleteRoom/:roomId', deleteRoom)
app.put('/updateRoomDetails/:roomId', updateRoomDetails)
app.put('/postBlacklistedCustomer/:userId', postBlacklistedCustomer)
app.put('/removeBlacklistedCustomer/:userId', removeBlacklistedCustomer)
app.get('/getAllCustomers', getAllCustomers) //testing
app.post('/addService/:roomId', addService) //testing
app.delete('/deleteService/:roomId/:service', deleteService) //testing

//users routes
app.post('/login', login)
app.get('/user/:userId', getUser) //testing
app.get('/getSenders/:receiverId', getSenders) //testing
app.get('/getMessages/:receiverId/:senderId', getMessages)
app.put('/updIsReadMessages/:receiverId/:senderId', updIsReadMessages) //testing
app.get('/rooms', getRooms)
app.get('/room/:roomId', getRoom)
app.get('/reviews', getReviews)
app.get('/review/:revId', getReview)
app.get('/getCustomer/:userId', getCustomer)
app.get('/getAllReservationsOfHotel', getAllReservationsOfHotel)
app.get('/getReservationOfHotel/:resId', getReservationOfHotel)
app.get('/getReservationHistoryOfHotel', getReservationHistoryOfHotel) //testing
app.post('/sendMessage', sendMessage)
app.put('/updateReservationDecision/:resId', updateReservationDecision)
app.put('/updateProfileDetails/:userId', updateProfileDetails)
app.put('/checkAvailabilityOfRooms', checkAvailabilityOfRooms) //testing
app.delete('/deleteReview/:revId', deleteReview)

//customers routes
app.get('/reservations/:userId', getReservationsOfCustomer)
app.get('/reservation/:resId/:userId', getReservationOfCustomer)
app.get('/availableRooms', getAvailableRooms)
app.get('/getCustomerBonus/:userId', getCustomerBonus)
app.get('/getRoomsByType/:type', getRoomsByType)
app.get('/getRoomsUntilPrice/:price', getRoomsUntilPrice)
app.post('/postReview', postReview)
app.get('/getAvailableRoomsByDate/:date',getAvailableRoomsByDate)//testing
app.post('/doReservation', doReservation)
app.post('/register', register)
app.put('/updateReview/:revId', updateReview)
app.put('/updateCustomerBonus/:userId', updateCustomerBonus)
app.delete('/cancelReservation/:resId', cancelReservation)

//receptionist routes
app.post('/postNotesAboutReservation', postNotesAboutReservation)
app.get('/getNotesAboutReservation/:resId', getNotesAboutReservation) //testing
app.delete('/delNotesAboutReservation/:resId', deleteNotesAboutReservation) //testing

exports.api = functions.region("europe-west6").https.onRequest(app)