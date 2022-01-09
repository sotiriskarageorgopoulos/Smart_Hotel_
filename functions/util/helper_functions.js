//Create helper functions

/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} email - User's email
 * @param {*} password - User's password
 */
exports.validateEmailAndPassword = (email, password) => {
    /**
     * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
     * @param {*} str - Given string
     */
    const isEmptyString = (str) => {
        if (str.trim() === '') return true;
        else return false;
    }

    /**
     * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
     * @param {*} email - Given email
     */
    const isEmail = (email) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(regEx)) return true;
        else return false;
    }

    let errors = {};

    if (isEmptyString(email)) {
        errors.email = 'Email must not be empty!'
    } else if (!isEmail(email)) {
        errors.email = "Must be a valid a address!"
    }

    if (isEmptyString(password)) {
        errors.password = 'Must not be empty!'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

/**
 * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
 * @param {*} data - Customer registration's data  
 */
exports.validateRegisterData = (data) => {
    let errors = {}

    let {
        name,
        surname,
        password,
        email,
        tel,
        birthDate,
        confirmPassword,
        nationality
    } = data

    /**
     * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
     * @param {*} str = Given string
     */
     const isEmptyString = (str) => {
        if (str.trim() === '') return true;
        else return false;
    }

    /**
     * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com>
     * @param {*} email - Given email
     */
    const isEmail = (email) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(regEx)) return true;
        else return false;
    }

    if (isEmptyString(email)) {
        errors.email = 'Email must not be empty!'
    } else if (!isEmail(email)) {
        errors.email = "Must be a valid a address!"
    }

    if (isEmptyString(password)) {
        errors.password = 'Must not be empty!'
    }

    if(isEmptyString(name)) {
        errors.name = "Must not be empty!"
    }

    if(isEmptyString(tel)) {
        errors.tel = 'Must not be empty!'
    }

    if(isEmptyString(birthDate)) {
        errors.birthDate = 'Must not be empty!'
    }

    if(isEmptyString(surname)) {
        errors.surname = "Must not be empty!"
    }

    if(isEmptyString(nationality)) {
        errors.nationality = 'Must not be empty!'
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Password must match!"
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}