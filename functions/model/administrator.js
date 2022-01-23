const User = require('./user')

/**
 * @author Dimitris Giannopoulos
 */
class Administrator extends User {
    constructor(userId, name, surname, birthDate, email, tel, password, image) {
        super(userId,name, surname, birthDate, email, tel, password, image)
    }
}

module.exports = Administrator