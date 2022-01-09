const {
    admin,
    db
} = require('../util/admin')

const {
    getAuth,
    signInWithEmailAndPassword
} = require('firebase/auth')

const firebase = require('firebase/app')
const config = require('../util/config')

firebase.initializeApp(config)

const {
    validateEmailAndPassword
} = require('../util/helper_functions')

/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    let {
        email,
        password
    } = req.body

    const {
        errors,
        valid
    } = validateEmailAndPassword(email, password)

    if (!valid) {
        return res.status(400).json(errors)
    }

    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
            return data.user.getIdToken()
        })
        .then(token => {
            return res.json({
                token
            })
        })
        .catch(err => {
            console.error(err)
            if (err.code === "auth/wrong-password") {
                return res.status(403).json({
                    general: "Wrong password, please try again!"
                })
            } else if (err.code === "auth/user-not-found") {
                return res.status(403).json({
                    general: "Wrong email, please try again!"
                })
            }
            return res.status(500).json({
                error: err.code
            })
        })
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