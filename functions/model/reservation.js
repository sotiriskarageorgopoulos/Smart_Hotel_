/**
 * @author Dimitris Giannopoulos
 */
class Reservation {
    constructor(reservationId, roomsIds, resDate, duration, customerNotes, userId, decision, totalPrice) {
        this.reservationId = reservationId
        this.roomsIds = roomsIds
        this.resDate = resDate
        this.duration = duration
        this.customerNotes = customerNotes
        this.userId = userId
        this.decision = decision
        this.totalPrice = totalPrice
    }

    set setReservationId(reservationId) {
        this.reservationId = reservationId
    }

    get getReservationId() {
        return this.reservationId
    }

    set setRoomsIds(roomsIds) {
        this.roomsIds = roomsIds
    }

    get getRoomsIds() {
        return this.roomsIds
    }

    set setResDate(resDate) {
        this.resDate = resDate
    }

    get getResDate() {
        return this.resDate
    }

    set setDuration(duration) {
        this.duration = duration
    }

    get getDuration() {
        return this.duration = duration
    }


    set setCustomerNotes(customerNotes) {
        this.customerNotes = customerNotes
    }

    get getCustomerNotes() {
        return this.customerNotes
    }

    set setUserId(userId) {
        this.UserId = userId
    }

    get getUserId() {
        return this.userId
    }

    set setDecision(decision) {
        this.decision = decision
    }

    get getDecision() {
        return this.decision
    }

    set setTotalPrice(totalPrice) {
        this.totalPrice = totalPrice
    }

    get getTotalPrice() {
        return this.totalPrice
    }

}

module.exports = Reservation