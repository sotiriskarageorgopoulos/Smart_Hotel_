const {
    admin,
    db
} = require('../util/admin')


/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.doReservation = (req, res) => {

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.cancelReservation = (req, res) => {

}

/**
 * @author Sotiris Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 * Παραδειγμα
 */
exports.postReview = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateReview = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationsOfCustomer = (req, res) => {

}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationOfCustomer = (req, res) => {

}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.getCustomerBonus = (req, res) => {
    let userId = req.params.userId
    db
        .collection("customer")
        .where("userId", "==", userId)
        .get()
        .then(data => {
            return res.json(data.docs[0].data().bonusPoints)
        })
        .catch(err => {
            console.error(err)
            return res.send("something went wrong")
        })
}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.updateCustomerBonus = (req, res) => {
    let {
        userId
    } = req.params
    let { bonusPoints } = req.body
    db
        .collection("customer")
        .where('userId', '==', userId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(404).send('No docs found')
            }
            data.docs.map(doc => {
                doc.ref.update({
                    bonusPoints
                })
            })
            return data
        })
        .then(() => {
            return res.send(`Customer with customerID ${userId} updated succesfully!`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })

}