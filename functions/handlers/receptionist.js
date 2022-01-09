const {
    admin,
    db
} = require('../util/admin')

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.postNotesAboutReservation = (req, res) => {

    let {resId} = req.params
    let receptionistNote = req.body

    if(Object.keys(receptionistNote).length == 0) {
        return res.status(400).send("Malformed request!")
    }

    db
    .collection("receptionistNote")
    .add(receptionistNote)
    .then (() => {
        return res.send(`The notes of the reservation ${resId} has been added`)
    })
    .catch(err => {
        console.error(err)
        res.status(500).send('Something went wrong...')
    })
}