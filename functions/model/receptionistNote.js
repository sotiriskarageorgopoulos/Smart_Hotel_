export class ReceptionistNode {
    constructor(receptionistId, reservationId, date, text){
        this.receptionistId = receptionistId
        this.reservationId = reservationId
        this.date = date
        this.text = text
    }

    set setReceptionistId(receptionistId) {
        this.recptionistId = receptionistId
    }

    get getReceptionistId() {
        return this.receptionistId
    }

    set setReservationId(reservationId) {
        this.reservationId = reservationId
    }

    get getReservationId() {
        return this.reservationId
    }

    set setDate(date) {
        this.date = date
    }

    get getDate() {
        return date
    }

    set setText(text) {
        this.text
    }

    get getText() {
        return this.text
    }
}