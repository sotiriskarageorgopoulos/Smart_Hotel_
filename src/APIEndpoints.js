/**
 * @author Sotirios Karageorgopoulos
 */
const BASE_URL = "https://europe-west6-smart-hotel-7965b.cloudfunctions.net/api"

export const endpoints = [
    {
        name: "getReservationsByDate",
        path: BASE_URL + "/reservationsByDate"
    }, {
        name: "getIncomeByDate",
        path: BASE_URL + "/incomeByDate"
    }, {
        name: "getRoomWithMaxReservations",
        path: BASE_URL + "/roomWithMaxReservations"
    }, {
        name: "getReservationsByMonth",
        path: BASE_URL + "/reservationsByMonth"
    }, {
        name: "getNumberOfCustomersByNationality",
        path: BASE_URL + "/numberOfCustomersByNationality"
    }, {
        name: "getMostDemandRooms",
        path: BASE_URL + "/mostDemandRooms/"
    }, {
        name: "updateRoomPrice",
        path: BASE_URL + "/updateRoomPrice/"
    }, {
        name: "updateRoomPriceWithDiscount",
        path: BASE_URL + "/updateRoomPriceWithDiscount/"
    }, {
        name: "upgradeRoomReservation",
        path: BASE_URL + "/upgradeRoomReservation/"
    }, {
        name: "changeRoomAvailability",
        path: BASE_URL + "/changeRoomAvailability/"
    }, {
        name: "postRoom",
        path: BASE_URL + "/room"
    }, {
        name: "deleteRoom",
        path: BASE_URL + "/deleteRoom/"
    }, {
        name: "updateRoomDetails",
        path: BASE_URL + "/updateRoomDetails/"
    }, {
        name: "postBlacklistedCustomer",
        path: BASE_URL + "/postBlacklistedCustomer/"
    },
    {
        name: "removeBlacklistedCustomer",
        path: BASE_URL + "/removeBlacklistedCustomer/"
    },
    {
        name: "login",
        path: BASE_URL + "/login"
    },
    {
        name: "getAvailableRooms",
        path: BASE_URL + "/availableRooms"
    },
    {
        name: "getSenders",
        path: BASE_URL + "/getSenders/"
    },
    {
        name: "getMessages",
        path: BASE_URL + "/getMessages/"
    },
    {
        name: "getRooms",
        path: BASE_URL + "/rooms"
    },
    {
        name: "getRoom",
        path: BASE_URL + "/room/"
    },
    {
        name: "getReviews",
        path: BASE_URL + "/reviews"
    },
    {
        name: "getReview",
        path: BASE_URL + "/review"
    },
    {
        name: "getCustomer",
        path: BASE_URL + "/getCustomer/"
    },
    {
        name: "getAllReservationsOfHotel",
        path: BASE_URL + "/getAllReservationsOfHotel"
    },
    {
        name: "getReservationOfHotel",
        path: BASE_URL + "/getReservationOfHotel/"
    },
    {
        name: "getRoomsByType",
        path: BASE_URL + "/getRoomsByType/"
    },
    {
        name: "getRoomsUntilPrice",
        path: BASE_URL + "/getRoomsUntilPrice/"
    },
    {
        name: "getAvailableRoomsByDate",
        path: BASE_URL + "/getAvailableRoomsByDate/"
    },
    {
        name: "getUser",
        path: BASE_URL + "/user/"
    },
    {
        name: "sendMessage",
        path: BASE_URL + "/sendMessage"
    },
    {
        name: "updateReservationDecision",
        path: BASE_URL + "/updateReservationDecision/"
    },
    {
        name: "updateProfileDetails",
        path: BASE_URL + "/updateProfileDetails/"
    },
    {
        name: "deleteReview",
        path: BASE_URL + "/deleteReview/"
    },
    {
        name: "getReservationsOfCustomer",
        path: BASE_URL + "/reservations/"
    },
    {
        name: "getReservationOfCustomer",
        path: BASE_URL + "/reservation/"
    },
    {
        name: "getCustomerBonus",
        path: BASE_URL + "/getCustomerBonus/"
    },
    {
        name: "postReview",
        path: BASE_URL + "/postReview"
    },
    {
        name: "doReservation",
        path: BASE_URL + "/doReservation"
    },
    {
        name: "register",
        path: BASE_URL + "/register"
    },
    {
        name: "updateReview",
        path: BASE_URL + "/updateReview/"
    },
    {
        name: "getReservationHistoryOfHotel",
        path: BASE_URL + "/getReservationHistoryOfHotel"
    },
    {
        name: "checkAvailabilityOfRooms",
        path: BASE_URL + "/checkAvailabilityOfRooms"
    },
    {
        name: "updateCustomerBonus",
        path: BASE_URL + "/updateCustomerBonus/"
    },
    {
        name: "cancelReservation",
        path: BASE_URL + "/cancelReservation/"
    },
    {
        name: "postNotesAboutReservation",
        path: BASE_URL + "/postNotesAboutReservation"
    },
    {
        name: "getNotesAboutReservation",
        path: BASE_URL + "/getNotesAboutReservation/"
    },
    {
        name: "delNotesAboutReservation",
        path: BASE_URL + "/delNotesAboutReservation/"
    },
    {
        name: "getAllCustomers",
        path: BASE_URL + "/getAllCustomers"
    },
    {
        name: "updIsReadMessages",
        path: BASE_URL + "/updIsReadMessages/"
    },
    {
        name: "addService",
        path: BASE_URL + "/addService/"
    },
    {
        name: "deleteService",
        path: BASE_URL + "/deleteService/"
    }
]