const {
    db
} = require('../util/admin')

const {
    getAuth,
    signInWithEmailAndPassword
} = require('firebase/auth')

const firebase = require('firebase/app')
const config = require('../util/config')
const {
    storeImgToBucket
} = require('../util/image')

firebase.initializeApp(config)

const {
    validateEmailAndPassword
} = require('../util/helper_functions')

const Message = require('../model/message')

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
            db
                .collection('administrator')
                .where('email', '==', email)
                .get()
                .then((data) => {
                    if (data.docs.length === 1) {
                        let userData = data.docs.map(d => d.data())[0]
                        return res.json({
                            token,
                            ...userData,
                            category: "administrator"
                        })
                    }
                })
                .then(() => {
                    db
                        .collection('customer')
                        .where('email', '==', email)
                        .get()
                        .then((data) => {
                            if (data.docs.length === 1) {
                                let userData = data.docs.map(d => d.data())[0]
                                return res.json({
                                    token,
                                    ...userData,
                                    category: "customer"
                                })
                            }
                        })
                        .catch((err) => {
                            console.error(err)
                            return res.status(500).send("Something went wrong...")
                        })
                })
                .then(() => {
                    db
                        .collection('receptionist')
                        .where('email', '==', email)
                        .get()
                        .then((data) => {
                            if (data.docs.length === 1) {
                                let userData = data.docs.map(d => d.data())[0]
                                return res.json({
                                    token,
                                    ...userData,
                                    category: "receptionist"
                                })
                            }
                        })
                        .catch(err => {
                            console.error(err)
                            return res.status(500).send("Something went wrong...")
                        })
                })
                .catch(err => {
                    console.error(err)
                    return res.status(500).send("Something went wrong")
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
exports.getRooms = (req, res) => {
    db
        .collection('room')
        .orderBy('roomId')
        .get()
        .then((data) => {
            let room = data.docs.map(d => d.data())
            return res.json(room)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json("Something went wrong...")
        })
}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getRoom = (req, res) => {
    let roomId = req.params.roomId

    db
        .collection("room")
        .where("roomId", "==", roomId)
        .limit(1)
        .get()
        .then((data) => {
            return res.json(data.docs[0].data())
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Admin
exports.getReviews = (req, res) => { //ok
    db
        .collection("review")
        .orderBy("date", "desc")
        .get()
        .then((data) => {
            let reviews = data.docs.map(d => d.data())
            return res.json(reviews)
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
//Customer,Admin
exports.getReview = (req, res) => { //ok
    let reviewId = req.params.revId

    db
        .collection("review")
        .where("reviewId", "==", reviewId)
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
//Customer,Receptionist,Admin
exports.sendMessage = (req, res) => {
    let {
        senderId,
        receiverId,
        text,
        date,
        isRead
    } = req.body

    let message = new Message(senderId, receiverId, text, date, Boolean(isRead))

    if (Object.keys(message).length == 0) {
        return res.status(400).send("Malformed request!")
    }
    db
        .collection("message")
        .add(JSON.parse(JSON.stringify(message)))
        .then(() => {
            return res.send(`The message send by ${senderId}`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.getSenders = (req, res) => {
    let receiverId = req.params.receiverId

    db
        .collection("message")
        .where("receiverId", "==", receiverId)
        .get()
        .then((data) => {
            let senderIds = [...new Set(data.docs.map(d => d.data().senderId))]

            let messages = data.docs.map(s => s.data())
                .sort((s1, s2) => new Date(s2.date) - new Date(s1.date))

            let latestMessages = []
            senderIds.map(sid => {
                let count = 0
                messages.map(m => {
                    if (m.senderId === sid && count == 0) {
                        latestMessages.push(m)
                        count++
                    }
                })
            })

            return latestMessages
        })
        .then(latestMessages => {
            db
                .collection("customer")
                .get()
                .then((data) => {
                    let senders = []
                    let customers = data.docs.map(c => c.data())
                    latestMessages.map(m => {
                        let customer = customers.filter(c => c.userId === m.senderId)[0]
                        if (customer !== undefined) {
                            customer = {
                                ...customer,
                                text: m.text,
                                isRead: m.isRead,
                                date: m.date
                            }
                            senders.push(customer)
                        }
                    })
                    return {
                        senders,
                        latestMessages
                    }
                })
                .then((obj) => {
                    db
                        .collection("receptionist")
                        .get()
                        .then(data => {
                            let {
                                senders,
                                latestMessages
                            } = obj
                            let receptionists = data.docs.map(r => r.data())
                            latestMessages.map(m => {
                                let receptionist = receptionists.filter(r => r.userId === m.senderId)[0]
                                if (receptionist !== undefined) {
                                    receptionist = {
                                        ...receptionist,
                                        text: m.text,
                                        isRead: m.isRead,
                                        date: m.date
                                    }
                                    senders.push(receptionist)
                                }
                            })
                            senders.sort((s1, s2) => new Date(s2.date) - new Date(s1.date))
                            return res.json(senders)
                        })
                        .catch((err) => {
                            console.error(err)
                            return res.status(500).send("Something went wrong...")
                        })
                })
                .catch((err) => {
                    console.error(err)
                    return res.status(500).send("Something went wrong...")
                })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getMessages = (req, res) => {
    let {
        senderId,
        receiverId
    } = req.params

    db
        .collection("message")
        .where("senderId", "==", senderId)
        .where("receiverId", "==", receiverId)
        .get()
        .then((data) => {
            let messages = data.docs.map(d => d.data())
            return res.json(messages)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Sotirios Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updIsReadMessages = (req, res) => {
    let {
        receiverId,
        senderId
    } = req.params
    db
        .collection("message")
        .where("senderId", "==", senderId)
        .where("receiverId", "==", receiverId)
        .get()
        .then(data => {
            if (data.docs.length > 0) {
                data.docs.map(d => {
                    if (Boolean(d.isRead) === false) {
                        d.ref.update({
                            isRead: true
                        })
                    }
                })
                return res.send(`The messages are seen...`)
            }
            return res.status(404).send(`Messages not found...`)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.updateProfileDetails = (req, res) => {
    let userId = req.params.userId
    let updOject = req.body
    if (Object.keys(updOject).length == 0) {
        return res.status(400).send("Malformed request!")
    }

    db
        .collection("customer")
        .where("userId", "==", userId)
        .limit(1)
        .get()
        .then((data) => {
            if (data.docs.length > 0) {
                if (updOject.hasOwnProperty("image")) {
                    const img = updOject.image
                    const imageURL = `https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/${userId}.png?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609`
                    data.docs.map(doc => {
                        doc.ref.update({
                            image: imageURL
                        })
                    })
                    storeImgToBucket(img, userId)
                } else {
                    data.docs.map(doc => {
                        doc.ref.update(updOject)
                    })
                }
                return res.send(`The profile with id: ${userId} has been updated`)
            }
            return data
        })
        .then(() => {
            db
                .collection("receptionist")
                .where("userId", "==", userId)
                .limit(1)
                .get()
                .then((data) => {
                    if (data.docs.length > 0) {
                        if (updOject.hasOwnProperty("image")) {
                            const img = updOject.image
                            const imageURL = `https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/${userId}.png?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609`
                            data.docs.map(doc => {
                                doc.ref.update({
                                    image: imageURL
                                })
                            })
                            storeImgToBucket(img, userId)
                        } else {
                            data.docs.map(doc => {
                                doc.ref.update(updOject)
                            })
                        }
                        return res.send(`The profile with id: ${userId} has been updated`)
                    }
                    return data
                })
                .then(() => {
                    db
                        .collection("administrator")
                        .where("userId", "==", userId)
                        .limit(1)
                        .get()
                        .then((data) => {
                            if (data.docs.length > 0) {
                                if (updOject.hasOwnProperty("image")) {
                                    const img = updOject.image
                                    const imageURL = `https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/${userId}.png?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609`
                                    data.docs.map(doc => {
                                        doc.ref.update({
                                            image: imageURL
                                        })
                                    })
                                    storeImgToBucket(img, userId)
                                } else {
                                    data.docs.map(doc => {
                                        doc.ref.update(updOject)
                                    })
                                }
                                return res.send(`The profile with id: ${userId} has been updated`)

                            }
                            return res.status(404).send("Documents not found")
                        })
                        .catch(err => {
                            console.error(err)
                            return res.status(500).send("Something went wrong...")
                        })
                })
                .catch(err => {
                    console.error(err)
                    return res.status(500).send("Something went wrong...")
                })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong...")
        })


}

/**
 * @author Sotrios Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getUser = (req, res) => {
    let {
        userId
    } = req.params
    db
        .collection("customer")
        .where("userId", "==", userId)
        .get()
        .then((data) => {
            if (data.docs.length > 0) {
                let user = data.docs[0].data()
                return res.json(user)
            }
            db
                .collection("administrator")
                .where("userId", "==", userId)
                .get()
                .then((data) => {
                    if (data.docs.length > 0) {
                        let user = data.docs[0].data()
                        return res.json(user)
                    }

                    db
                        .collection("receptionist")
                        .where("userId", "==", userId)
                        .get()
                        .then((data) => {
                            if (data.docs.length > 0) {
                                let user = data.docs[0].data()
                                return res.json(user)
                            }
                        })
                        .catch(err => {
                            console.error(err)
                            return res.status(500).send("Something went wrong...")
                        })
                })
                .catch(err => {
                    console.error(err)
                    return res.status(500).send("Something went wrong...")
                })
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong...")
        })

}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Admin
exports.deleteReview = (req, res) => { //ok
    let {
        revId
    } = req.params

    db
        .collection("review")
        .where("reviewId", "==", revId)
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
            return res.send(`The review with id ${revId} deleted successfully!`)
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong!")
        })
}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.updateReservationDecision = (req, res) => { //problem
    let {
        resId
    } = req.params
    let updateObj = req.body

    if (Object.keys(updateObj).length == 0) {
        return res.status(400).send("Malformed request!")
    }

    db
        .collection("reservation")
        .where("reservationId", "==", resId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(404).send("Documents not found")
            }
            data.docs.map(d => {
                d.ref.update(updateObj)
            })
            return res.send(`Reservation with id ${resId} updated succesfully`)
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })


}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getCustomer = (req, res) => {
    let userId = req.params.userId
    db
        .collection("customer")
        .where("userId", "==", userId)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).send("Documents not found")
            }
            return res.json(data.docs[0].data())
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllReservationsOfHotel = (req, res) => {
    db
        .collection("reservation")
        .get()
        .then((data) => {
            let today = new Date();
            let allRes = data.docs.map(d => d.data())
            let reservations = []
            allRes.map(r => {
                let resDateStart = new Date(r.resDate)
                let days = Number(r.duration) * 1000 * 60 * 60 * 24
                let resDateEnd = new Date(resDateStart.getTime() + days)
                if (today <= resDateEnd) {
                    reservations.push(r)
                }
            })
            return res.json(reservations.sort((r1, r2) => new Date(r2.resDate) - new Date(r1.resDate)))
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json("Something went wrong...")
        })

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
//Receptionist,Admin
exports.getReservationOfHotel = (req, res) => {
    let resId = req.params.resId

    db
        .collection("reservation")
        .where("reservationId", "==", resId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.send('The reservation does not exist')
            }
            return res.json(data.docs[0].data())
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })

}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationHistoryOfHotel = (req, res) => {
    db
        .collection('reservation')
        .get()
        .then((data) => {
            let today = new Date()
            let allRes = data.docs.map(d => d.data())
            let reservations = []
            allRes.map(r => {
                let resDateStart = new Date(r.resDate)
                let days = Number(r.duration) * 1000 * 60 * 60 * 24
                let resDateEnd = new Date(resDateStart.getTime() + days)
                if (today >= resDateEnd) {
                    reservations.push(r)
                }
            })
            return res.json(reservations.sort((r1, r2) => new Date(r2.resDate) - new Date(r1.resDate)))
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })
}

/**
 * @author Sotiris Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.checkAvailabilityOfRooms = (req, res) => {
    db
        .collection("reservation")
        .get()
        .then((data) => {
            let today = new Date()
            let allRes = data.docs.map(r => r.data())
            allRes
                .map(r => {
                    let resDateStart = new Date(r.resDate)
                    let days = Number(r.duration) * 1000 * 60 * 60 * 24
                    let resDateEnd = new Date(resDateStart.getTime() + days)
                    if (resDateStart <= today && resDateEnd >= today && r.decision === "accepted") {
                        r.roomsIds.map(rid => {
                            db
                                .collection("room")
                                .where("roomId", "==", rid)
                                .get()
                                .then((data) => {
                                    if (data.docs.length === 0) {
                                        return res.status(404).send("Room not found!")
                                    }
                                    data.docs.map((doc) => {
                                        doc.ref.update({
                                            availability: false
                                        })
                                    })
                                })
                                .catch((err) => {
                                    console.error(err)
                                    return res.status(500).send("Something went wrong")
                                })
                        })
                    }
                })
            return res.send("The availability check is ok...")
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })
}