const {
    admin,
    db
} = require("../util/admin")

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationsByDay = (req, res) => {}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getIncomeByDay = (req, res) => {}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getRoomWithMaxReservations = (req, res) => {}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationsByMonth = (req, res) => {}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.getNumberOfCustomersByNationality = (req, res) => {
db
.collection("customer")
.get()
.then((data) => {
    let customer = data.docs.map(d => d.data())
    return res.json(customer)
})
.catch(err => {
    console.error(err)
    return res.status(500).json("Something went wrong...")
})
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.getMostDemandRooms = (req, res) => {}