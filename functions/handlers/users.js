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
exports.getRooms = (req, res) => {
db
.collection('room')
.orderBy('availability')
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
    .where("roomId","==",roomId)
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
//Customer,Receptionist,Admin
exports.getAvailableRooms = (req, res) => {//ok
    db
    .collection("room")
    .where("availability","==",true)
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
 * @author Dimitris Giannopoulos 
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Admin
exports.getReviews = (req, res) => {//ok
    db
    .collection("review")
    .orderBy("date","desc")
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
exports.getReview = (req, res) => {//ok
    let reviewId = req.params.revId

    db
    .collection("review")
    .where("reviewId","==",reviewId)
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
const Message = require('../model/message')
/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
//Customer,Receptionist,Admin
exports.sendMessage = (req, res) => {
    let {senderId, receiverId, susbject, text, date, isRead} = req.body

    let message = new Message(senderId, receiverId, susbject, text, date, isRead)

    if(Object.keys(message).length == 0) {
        return res.status(400).send("Malformed request!")
    } 
    db
    .collection("message")
    .add(JSON.parse(JSON.stringify(message)))
    .then (() => {
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
//Customer,Receptionist,Admin
exports.getMessages = (req, res) => {

    let receiverId = req.params.receiverId
  
    db
    .collection("message")
    .where("receiverId","==",receiverId)
    .get()
    .then((data) => {
        let messages = []
        data.docs.map(d => {
            messages.push(d.data())
        })
        return res.json(messages)
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
exports.deleteReview = (req, res) => {//ok
    let {revId} = req.params

    db
    .collection("review")
    .where("reviewId","==",revId)
    .get()
    .then((data) => {
        if(data.docs.length == 0) {
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
exports.updateReservationDecision = (req, res) => {//problem
    let {resId} = req.params
    let updateObj = req.body

    if(Object.keys(updateObj).length == 0) {
        return res.status(400).send("Malformed request!")
    }

    db
    .collection("reservation")
    .where("reservationId","==",resId)
    .get()
    .then((data) => {
        if(data.docs.length == 0) {
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