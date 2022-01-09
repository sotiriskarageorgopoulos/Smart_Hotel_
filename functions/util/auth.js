const {
    admin,
    db
} = require('./admin')

/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    let tokenId;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        tokenId = req.headers.authorization.split('Bearer ')[1]
    } else {
        console.error("No token found")
        return res.status(403).json({
            error: 'Unauthorized'
        })
    }

    const auth = admin.auth()

    auth
        .verifyIdToken(tokenId)
        .then((decodedToken) => {
            req.user = decodedToken
            return db
                .collection("customer")
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get()
        })
        .then((customerData) => {
            if (Object.keys(customerData).length > 0) {
                req.user.name = customerData.docs[0].data().name
                req.user.surname = customerData.docs[0].data().surname
                req.user.image = customerData.docs[0].data().image
                req.user.tel = customerData.docs[0].data().tel
                req.user.email = customerData.docs[0].data().email
                req.user.bonusPoints = customerData.docs[0].data().bonusPoints
                req.user.birthDate = customerData.docs[0].data().birthDate
                return next()
            }

            return db
                .collection("receptionist")
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get()
        })
        .then((receptionistData) => {
            if (Object.keys(receptionistData).length > 0) {
                req.user.name = receptionistData.docs[0].data().name
                req.user.surname = receptionistData.docs[0].data().surname
                req.user.image = receptionistData.docs[0].data().image
                req.user.tel = receptionistData.docs[0].data().tel
                req.user.email = receptionistData.docs[0].data().email
                req.user.bonusPoints = receptionistData.docs[0].data().bonusPoints
                req.user.birthDate = receptionistData.docs[0].data().birthDate
                return next()
            }

            return db
                .collection("administrator")
                .where("userId", "==", req.user.uid)
                .limit(1)
                .get()
        })
        .then((administratorData) => {
            req.user.name = administratorData.docs[0].data().name
            req.user.surname = administratorData.docs[0].data().surname
            req.user.image = administratorData.docs[0].data().image
            req.user.tel = administratorData.docs[0].data().tel
            req.user.email = administratorData.docs[0].data().email
            req.user.bonusPoints = administratorData.docs[0].data().bonusPoints
            req.user.birthDate = administratorData.docs[0].data().birthDate
            return next()
        })
        .catch((err) => {
            console.error(err)
            return res.status(403).json(err)
        })

}