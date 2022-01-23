const User = require('./user')

class Receptionist extends User {
    constructor(userId, name, surname, birthDate, email, tel, password, image) {
        super(userId, name, surname, birthDate, email, tel, password, image)
    }
}

module.exports = Receptionist