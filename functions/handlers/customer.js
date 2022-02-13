const {
    admin,
    db
} = require('../util/admin')

const config = require('../util/config')

const {
    getAuth,
    createUserWithEmailAndPassword
} = require('firebase/auth')

const {
    validateRegisterData
} = require('../util/helper_functions')

const Review = require('../model/review')
const Reservation = require('../model/reservation')
/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {
    let {
        name,
        surname,
        password,
        email,
        tel,
        birthDate,
        confirmPassword,
        nationality
    } = req.body

    let newCustomer = {
        name,
        surname,
        password,
        email,
        tel,
        birthDate,
        confirmPassword,
        nationality
    }

    const {
        errors,
        valid
    } = validateRegisterData(newCustomer)

    if (!valid) {
        return res.status(400).json(errors)
    }

    const noImg = 'no-img.png'
    let userId, token

    db
        .doc(`/customer/${newCustomer.email}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({
                    message: "This user already exists!"
                })
            } else {
                const auth = getAuth()
                return createUserWithEmailAndPassword(auth, newCustomer.email, newCustomer.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const customerCredentials = {
                userId,
                name,
                surname,
                password,
                tel,
                email,
                nationality,
                birthDate,
                bonusPoints: 0,
                blackListed: false,
                image: `https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/${noImg}?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609`
            }
            db
                .collection("customer")
                .add(customerCredentials)
                .then(() => {
                    return res.status(201).json({
                        token,
                        ...customerCredentials
                    })
                })
        })
        .catch(err => {
            console.error(err)
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({
                    email: 'Email is already in use'
                })
            } else {
                return res.status(500).json({
                    error: err.code
                })
            }
        })
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.doReservation = (req, res) => {
    let {
        reservationId,
        roomsIds,
        resDate,
        duration,
        customerNotes,
        totalPrice,
        userId,
        decision,
    } = req.body
    const reservation = new Reservation(reservationId, roomsIds, resDate, +duration, customerNotes, userId, decision, +totalPrice)

    if (Object.keys(reservation).length === 0) {
        res.status(400).send('There is no Reservation to commit')
    }
    
    db
    .collection("reservation")
    .add(JSON.parse(JSON.stringify(reservation)))
    .then(() => {
        let today = new Date().toISOString().slice(0,10)
        if(resDate.slice(0,10) === today) {
            reservation
            .getRoomsIds
            .map(rid => {
                db
                    .collection("room")
                    .where("roomId", "==",rid)
                    .get()
                    .then((data) => {
                        data.docs.map((doc) => {
                                doc.ref.update({availability: false})
                        })
                    }) 
                    .catch((err) => {
                        console.error(err)
                        return res.status(500).send("Something went wrong!")
                    })
            })
        }
        return res.send(`Reservation with ${reservation.getReservationId} is ok...`)
    })
    .catch((err) => {
        console.error(err)
        return res.status(500).send("Something went wrong!")
    })
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */ //ok
exports.cancelReservation = (req, res) => {
    let resId = req.params.resId;

    db
        .collection("reservation")
        .where("reservationId", "==", resId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(404).send("Documents not found")
            }
            data.docs.map(doc => {
                doc.ref.delete()
            })
            return data
        })
        .then(() => {
            return res.send(`Reservation with id: ${resId} deleted successfully!`)
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong!")
        })
}

/**
 * @author Sotiris Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 * Παραδειγμα
 */
exports.postReview = (req, res) => {
    let {
        reviewId,
        userId,
        comment,
        date,
        rating
    } = req.body

    let review = new Review(reviewId, userId, comment, date, +rating)

    if (Object.keys(review).length === 0) {
        res.status(400).send('There is no review to add!')
    }

    db
        .collection("review")
        .add(JSON.parse(JSON.stringify(review)))
        .then(() => {
            res.send(`The review with reviewId '${reviewId}' is added to collection!`)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).json("Something went wrong!")
        })
}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateReview = (req, res) => { //problem
    let {
        revId
    } = req.params
    let updateReviewObj = req.body

    if (Object.keys(updateReviewObj).length === 0) {
        return res.status(400).json("Bad Request")
    }

    db
        .collection("review")
        .where("reviewId", "==", revId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
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
exports.getReservationsOfCustomer = (req, res) => { //went wrong
    let userId = req.params.userId

    db
        .collection("reservation")
        .where("userId", "==", userId)
        .orderBy("resDate", "desc")
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
exports.getReservationOfCustomer = (req, res) => { //ok
    let reservationId = req.params.resId
    let userId = req.params.userId

    db
        .collection("reservation")
        .where("userId", "==", userId)
        .where("reservationId", "==", reservationId)
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
    let userId = req.params.userId
    db
        .collection("customer")
        .where("userId", "==", userId)
        .get()
        .then(data => {
            return res.json({
                bonusPoints: data.docs[0].data().bonusPoints
            })
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
    let {
        bonusPoints
    } = req.body
    db
        .collection("customer")
        .where('userId', '==', userId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(404).send('No customer found')
            }
            data.docs.map(doc => {
                doc.ref.update({
                    bonusPoints: +bonusPoints
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

/**
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAvailableRooms = (req, res) => {
    db
        .collection("room")
        .where("availability", "==", true)
        .get()
        .then((data) => {
            let rooms = data.docs.map(d => d.data())
            return res.json(rooms)
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json("Something went wrong...")
        })
}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getRoomsByType = (req, res) => {
    let type = req.params.type

    db
        .collection("room")
        .where("type", "==", type)
        .get()
        .then(data => {
            return data.docs.map(d => d.data())
        })
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })
}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getRoomsUntilPrice = (req, res) => {
    let price = req.params.price
    db
        .collection("room")
        .where("price", "<=", Number(price))
        .get()
        .then((data) => {
            return res.json(data.docs.map(d => d.data()))
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json("Something went wrong...")
        })
}

/**
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
*/
exports.getAvailableRoomsByDate = (req, res) => {
    let {
        date
    } = req.params
    db
        .collection("room")
        .get()
        .then((data) => {
            let allRooms = data.docs.map(d => d.data())

            db
                .collection("reservation")
                .get()
                .then((data) => {
                    let rooms = []
                    let reservations = data.docs.map(d => d.data())
                    let allRoomsIds = reservations
                        .filter(r => r.resDate.slice(0, 10) === date.slice(0, 10))
                        .map(r => r.roomsIds.map(rid => rid))
                    allRooms.map(room => {
                        let n = allRoomsIds.filter(rid => room.roomId === rid).length
                        if (n === 0) {
                            rooms.push(room)
                        }
                    })
                    return res.json(rooms)
                })
                .catch(err => {
                    console.error(err)
                    return res.status(500).json("Something went wrong...")
                })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json("Something went wrong...")
        })
}