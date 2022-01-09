const {
    User
} = require('./user')

export class Customer extends User {
    constructor(userId, name, surname, birthDate, email, tel, password, image, nationality, bonusPoints, blackListed) {
        super(userId, name, surname, birthDate, email, tel, password, image)
        this.bonusPoints = bonusPoints
        this.blackListed = blackListed
        this.nationality = nationality
    }

    set setNationality(nationality) {
        this.nationality = nationality
    }

    get getNationality() {
        return this.nationality
    }

    set setBonusPoints(bonusPoints) {
        this.bonusPoints = bonusPoints
    }

    get getBonusPoints() {
        return bonusPoints
    }

    set setBlackListed(blackListed) {
        this.blackListed = blackListed
    }

    get getBlackListed() {
        return this.blackListed
    }

}