export class User {
    constructor(userId, name, surname, birthDate, email, tel, password, image) {
        this.userId = userId
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.email = email
        this.tel = tel
        this.password = password
        this.image = image
    }

        set setUserId(userId) {
            this.userId = userId
        }

        get getUserId() {
            return this.userId
        }

        set setName(name) {
            this.name = name
        }

        get getName() {
            return this.name
        }

        set setSurname(surname) {
            this.surname = surname
        }

        get getSurname() {
            return this.surname
        }

        set setBirthDate(birthDate) {
            this.birthDate = birthDate
        }

        get getBirthDate() {
            return this.birthDate
        }

        set setEmail(email) {
            this.email = email
        }

        get getEmail() {
            return this.email
        }

        set setTel(tel) {
            this.tel = tel
        }

        get getTel() {
            return this.tel
        }

        set setPassword(password) {
            this.password = password
        }

        get getPassword() {
            return this.password
        }

        set setImage(image) {
            this.image = image
        }

        get getImage() {
            return this.image
        }
}