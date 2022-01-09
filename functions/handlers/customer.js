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
exports.updateReview = (req, res) => {  //problem
    let {revId} = req.params
    let updateReviewObj = req.body

    if(Object.keys(updateReviewObj).length === 0) {
        return res.status(400).json("Bad Request")
    }

    db
    .collection("review")
    .where("reviewId","==",revId)
    .get()
    .then((data) => {
        if(data.docs.length == 0) {
            return res.status(404).send("Documents not found")
        }
        data.docs.map(doc => {
            doc.ref.update(updateReviewObj)
        })
        return data
    })
    .then(() => {
        return res.send(`The document with id ${revId} updated successfully`)
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).send("Something went wrong")
    })
}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationsOfCustomer = (req, res) => {//went wrong
    let userId = req.params.userId

    db
    .collection("reservation")
    .where("userId","==",userId)
    .orderBy("resDate","desc")
    .get()
    .then((data) => {
        let reservations = data.docs.map(d => d.data())
        return res.json(reservations)
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).json("Something went wrong...")
    })
}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationOfCustomer = (req, res) => {//ok
    let reservationId = req.params.resId
    let userId = req.params.userId

    db
    .collection("reservation")
    .where("userId","==",userId)
    .where("reservationId","==",reservationId)
    .get()
    .then((data) => {
        return res.json(data.docs[0].data())
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).send("Something went wrong!")
    })
}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.getCustomerBonus = (req, res) => {

}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.updateCustomerBonus = (req, res) => {

}