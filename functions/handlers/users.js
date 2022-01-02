const {
    admin,
    db
} = require('../util/admin')

/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {

}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getRooms = (req, res) => {}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getRoom = (req, res) => {}

/**
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.getAvailableRooms = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Admin
exports.getReviews = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Admin
exports.getReview = (req, res) => {

}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.getRoomsByCategory = (req, res) => {

}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.getRoomsUntilPrice = (req, res) => {

}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.sendMessage = (req, res) => {

}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.getMessage = (req, res) => {

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.updateProfileDetails = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Admin
exports.deleteReview = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.postReservationDecision = (req, res) => {

}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getBlackListedCustomer = (req, res) => {

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getAllReservationsOfHotel = (req, res) => {

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getReservationOfHotel = (req, res) => {

}