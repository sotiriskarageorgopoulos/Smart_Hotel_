const {
    admin,
    db
} = require('../util/admin')
const ReceptionistNote = require('../model/receptionistNote')
/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.postNotesAboutReservation = (req, res) => {
    let {
        receptionistId,
        reservationId,
        date,
        text
    } = req.body

    let receptionistNote = new ReceptionistNote(receptionistId, reservationId, date, text)

    if (Object.keys(receptionistNote).length == 0) {
        return res.status(400).send("Malformed request!")
    }

    db
        .collection("receptionistNote")
        .add(JSON.parse(JSON.stringify(receptionistNote)))
        .then(() => {
            return res.send(`The notes of the reservation ${reservationId} has been added`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}

/**
 * @author Giorgos Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getNotesAboutReservation = (req, res) => {
    let {
        resId
    } = req.params

    db
        .collection("receptionistNote")
        .where("reservationId", "==", resId)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).send("Notes not found...")
            }
            let notes = data.docs.map(d => d.data())[0]
            return res.json(notes)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}


/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteNotesAboutReservation = (req, res) => {
    let {
        resId
    } = req.params
    db
        .collection("receptionistNote")
        .where("reservationId", "==", resId)
        .get()
        .then((data) => {
            if (data.docs.length === 0) {
                return res.status(404).send("Notes not found...")
            }
            data.docs.map(doc => {
                doc.ref.delete({
                    reservationId: resId
                })
            })
            return res.send(`The receptionist note with reservation id ${resId} deleted successfully...`)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send('Something went wrong...')
        })
}