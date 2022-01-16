const {
    admin,
    db
} = require("../util/admin")

/**
 * @author George Koulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationsByDay = (req, res) => {}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getIncomeByDay = (req, res) => {}

/**
 * @author Dimitris Giannopoulos
 * @param {*} req 
 * @param {*} res 
 */
exports.getRoomWithMaxReservations = (req, res) => {//went wrong

    db
    .collection("room")
    .get()
    .then((data) => {
        return data.docs.map(d => d.data())
    })
    .then((rooms) => {
        db
        .collection("reservation")
        .get()
        .then((reservations) => {
            let numberOfReservations = []
            rooms.map(r => {
                let count = 0
                reservations.docs.map(d => {
                    let roomsId = d.data().roomsIds
                    roomsId.map(rid => {
                        if(r.roomId === rid) {
                            count++
                        }
                    })
                })
                numberOfReservations.push({room:r, count})
            })
            return numberOfReservations
        })
        .then((data) => {
            data.sort((a,b) => b.count - a.count)
            return res.json(data[0].room)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Something went wrong")
        })

    })
    .catch(err => {
        console.error(err)
        return res.status(500).send("Something went wrong")
    })
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.getReservationsByMonth = (req, res) => {}

/**
 * @author Venetia Tassou
 * @param {*} req 
 * @param {*} res 
 */
exports.getNumberOfCustomersByNationality = (req, res) => {
db 
.collection("customer")
.get()
.then((data) => {
    let customer = data.docs.map(d => d.data())
    return customer
})
.then ((data) => {
    let nationalities = []
    data.map(d => {
        nationalities.push(d.nationality)
    })
    nationalities = [...new Set(nationalities)]
    let customerByNationality = []
    nationalities.map(n => {
       let people = data.filter(d => d.nationality === n)
        .length
        customerByNationality.push({
            people,
            nationality: n
        })
    }) 
    return customerByNationality
})
.then ((data) => {
    return res.json(data)
})
.catch(err => {
    console.error(err)
    return res.status(500).json("Something went wrong...")
})
}

/**
 * @author Dimitris Michailidis
 * @param {*} req 
 * @param {*} res 
 */
exports.getMostDemandRooms = (req, res) => {}