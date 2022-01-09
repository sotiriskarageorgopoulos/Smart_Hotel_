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
            return db
                .collection("customer")
                .add(customerCredentials)
        })
        .then(token => {
            return res.status(201).json({
                token
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