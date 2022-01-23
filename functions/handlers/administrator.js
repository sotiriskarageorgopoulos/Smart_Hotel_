const {
    admin,
    db
} = require('../util/admin')
const Room = require("../model/room")
/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRoomPrice = (req, res) => {
    let { roomId } = req.params
    let { price } = req.body

    db
        .collection("room")
        .where('roomId','==',roomId)
        .get()
        .then((data) => {
            if(data.docs.length == 0) {
                return res.status(400).send("Malformed request!")
              }    
            data.docs.map(doc => {
                 doc.ref.update({price})
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
    let { roomId } = req.params
    let { discount} = req.body

    db
        .collection("room")
        .where('roomId','==',roomId)
        .get()
        .then((data) => {
            if(data.docs.length == 0) {
                return res.status(400).send("Malformed request!")
              }   
              let price = data.docs[0].data().price-(data.docs[0].data().price*Number(discount)) 
            data.docs.map(doc => {
                 doc.ref.update({price})
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
    
    let reservationId = req.params.reservationId
    let roomId = req.params.roomId
    let updateObj = req.body

    if(Object.keys(updateObj).length === 0) {
        return res.status(400).json("No such Reservation")
    }
    db
    .collection("reservation")
    .where("reservationId","==",reservationId)
    .limit(1)
    .get()
    .then((data)=>{
        let roomsIds = data.docs[0].data().roomsIds
        let indexOfDeletedRoom = roomsIds.indexOf(roomId)
        roomsIds[indexOfDeletedRoom] = updateObj.roomId
        db
        .collection("reservation")
        .where("reservationId","==",reservationId)
        .get()
        .then((data) => {
            if(data.docs.length === 0){
                return res.status(404).send("Documents not found")
            }
            data.docs.map((doc) => {
                doc.ref.update({roomsIds})
            })
            return res.send("Reservation upgraded successfully")
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
exports.doUnavailableRoom = (req, res) => {
    let roomId = req.params.roomId;


    db
        .collection("room")
        .where("roomId", "==", roomId)
        .get()
        .then((data) => {
            if (data.docs[0].data().availability == false) {
                return res.send('Room is already unavailable')
            }
            data.docs.map(doc => {
                doc.ref.update({
                    availability: false
                })
            })
            return data
        })
        .then(() => {
            return res.send(`Room ${roomId} is now unavailable`)
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
    let {roomId,type,description,services,capacity,size, availability, image, price}= req.body
    let room = new Room(roomId,type,description,services,capacity,size, availability, image, price)
    db
        .collection("room")
        .add(JSON.parse(JSON.stringify(room)))
        .then(() => {
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
    let {roomId} = req.params

    db
    .collection("room")
    .where('roomId','==',roomId)
    .get()
    .then((data) => {
        if(data.docs.length===0){
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
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRoomDetails = (req, res) => {
    let { roomId } = req.params
    let roomDetails  = req.body

    db
        .collection("room")
        .where('roomId','==',roomId)
        .get()
        .then((data) => {
            if(data.docs.length == 0) {
                return res.status(400).send("Malformed request!")
              }    
            data.docs.map(doc => {
                 doc.ref.update(roomDetails)
            })
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