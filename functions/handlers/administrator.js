const {
    admin,
    db,
    firestore
} = require('../util/admin')

const {
    storeImgToBucket
} = require('../util/image')
const Room = require("../model/room")

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRoomPrice = (req, res) => {
    let {
        roomId
    } = req.params
    let {
        price
    } = req.body

    db
        .collection("room")
        .where('roomId', '==', roomId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(400).send("Malformed request!")
            }
            data.docs.map(doc => {
                doc.ref.update({
                    price
                })
            })
            return data
        })
        .then(() => {
            return res.send(`room price for roomId ${roomId} updated successfully!`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Something went wrong...")
        })
}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRoomPriceWithDiscount = (req, res) => {
    let {
        roomId
    } = req.params
    let {
        discount
    } = req.body

    db
        .collection("room")
        .where('roomId', '==', roomId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(400).send("Malformed request!")
            }
            let price = Number(data.docs[0].data().price) - (Number(data.docs[0].data().price) * Number(discount))
            data.docs.map(doc => {
                doc.ref.update({
                    price
                })
            })
            return data
        })
        .then(() => {
            return res.send(`price with discount for roomId ${roomId} updated successfully!`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.upgradeRoomReservation = (req, res) => {
    let {
        reservationId,
        updRoomId
    } = req.params

    let updateObj = req.body

    if (Object.keys(updateObj).length === 0) {
        return res.status(400).json("Malformed Request")
    }
    db
        .collection("reservation")
        .where("reservationId", "==", reservationId)
        .limit(1)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).json("No such Reservation")
            }
            data.docs.map(doc => {
                doc.ref.update({
                        roomsIds: firestore.FieldValue.arrayRemove(updRoomId)
                    })
                    .then(() => {
                        data.docs.map(doc => {
                            doc.ref.update({
                                    roomsIds: firestore.FieldValue.arrayUnion(updateObj.roomId)
                                })
                                .then(() => {
                                    return res.send(`Reservation upgraded successfully...`)
                                })
                                .catch((err) => {
                                    console.error(err)
                                    return res.status(500).send("Something went wrong")
                                })
                        })
                    })
                    .catch((err) => {
                        console.error(err)
                        return res.status(500).send("Something went wrong")
                    })
            })
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
 */ //ok
exports.changeRoomAvailability = (req, res) => {
    let roomId = req.params.roomId;
    let availability = req.body.availability;

    db
        .collection("room")
        .where("roomId", "==", roomId)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).send("Room is not found...")
            }
            data.docs.map(doc => {
                doc.ref.update({
                    availability
                })
            })
            return data
        })
        .then(() => {
            return res.send(`Room ${roomId} availability changed...`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.postRoom = (req, res) => {
    let {
        roomId,
        type,
        description,
        services,
        capacity,
        size,
        availability,
        image,
        price
    } = req.body
    const imageURL = `https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/${roomId}.png?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609`
    let room = new Room(roomId, type, description, services, capacity, size, Boolean(availability), imageURL, +price)
    db
        .collection("room")
        .add(JSON.parse(JSON.stringify(room)))
        .then(() => {
            storeImgToBucket(image, roomId)
            return res.send(`Room with roomId ${roomId} added succesfully!`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteRoom = (req, res) => {
    let {
        roomId
    } = req.params

    db
        .collection("room")
        .where('roomId', '==', roomId)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).send("Documents not found")
            }
            data.docs.map(doc => {
                doc.ref.delete()
            })
            return data
        })
        .then(() => {
            return res.send(`The room with roomId ${roomId} was deleted successfully!`)
        })
        .catch(() => {
            return res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Sotirios Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.addService = (req, res) => {
    let {
        roomId
    } = req.params
    let {
        service
    } = req.body

    db
        .collection("room")
        .where("roomId", "==", roomId)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).send('No room found...')
            }

            data.docs.map(doc => {
                doc.ref.update({
                    services: firestore.FieldValue.arrayUnion(service)
                })
            })
            return res.send(`Service added successfully...`)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send('Something went wrong...')
        })
}

/**
 * @author Sotirios Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteService = (req, res) => {
    let {
        roomId,
        service
    } = req.params

    db
        .collection("room")
        .where("roomId", "==", roomId)
        .get()
        .then(data => {
            if (data.docs.length === 0) {
                return res.status(404).send('No room found...')
            }
            data.docs.map(doc => {
                doc.ref.update({
                    services: firestore.FieldValue.arrayRemove(service)
                })
            })
            return res.send(`Service removed successfully...`)
        }).catch(err => {
            console.error(err)
            return res.status(500).send('Something went wrong...')
        })
}


/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRoomDetails = (req, res) => {
    let {
        roomId
    } = req.params
    let roomDetails = req.body

    db
        .collection("room")
        .where('roomId', '==', roomId)
        .get()
        .then((data) => {
            if (data.docs.length == 0) {
                return res.status(404).send("Rooms not found!")
            }
            if (roomDetails.hasOwnProperty("image")) {
                let img = roomDetails.image
                storeImgToBucket(img, roomId)
            } else {
                data.docs.map(doc => {
                    doc.ref.update(roomDetails)
                })
            }
            return data
        })
        .then(() => {
            return res.send(`room with roomId ${roomId} updated successfully!`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Something went wrong...")
        })
}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.postBlacklistedCustomer = (req, res) => {
    let {
        userId
    } = req.params

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
                    blackListed: true
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
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.removeBlacklistedCustomer = (req, res) => {
    let {
        userId
    } = req.params

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
                    blackListed: false
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
 * @author Sotirios Karageorgopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllCustomers = (req, res) => {
    db
        .collection("customer")
        .get()
        .then(data => {
            let customers = data.docs.map(d => d.data())
            res.json(customers)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}