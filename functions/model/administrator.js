/**
 * @author Dimitris Giannopoulos
 */
const User = require('./user')

class Administrator extends User {
    constructor(userId, name, surname, birthDate, email, tel, password, image) {
        super(userId,name, surname, birthDate, email, tel, password, image)
    }
}

module.exports = Administrator