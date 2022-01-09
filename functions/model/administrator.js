const {
    User
} = require('./user')

/**
 * @author Dimitris Giannopoulos
 */
export class Administrator extends User {
    constructor(userId, name, surname, birthDate, email, tel, password, image) {
        super(name, surname, birthDate, email, tel, password, image)
    }
}