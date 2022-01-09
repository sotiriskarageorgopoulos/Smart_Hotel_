export class Reservation {
    constructor(reservationId, roomIds, resDate, duration, price, customerNotes, userId, decision) {
        this.reservationId = reservationId
        this.roomIds = roomIds
        this.resDate = resDate
        this.duration = duration
        this.price = price
        this.customerNotes = customerNotes
        this.userId = userId
        this.decision = decision
    }

    set setReservationId(reservationId) {
        this.reservationId = reservationId
    }

    get getReservationId() {
        return this.reservationId
    }

    set setRoomIds(roomIds) {
        this.roomIds = roomIds
    }

    get getRoomIds() {
        return this.roomIds
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

    set setPrice(price) {
        this.price = price
    }

    get getPrice() {
        return this.price
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

}