/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 */
const admin = require('firebase-admin')
const {firestore} = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

module.exports = {
    admin,
    db,
    firestore
}