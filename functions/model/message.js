/**
 * @author Dimitris Giannopoulos
 */
class Message {
    constructor(senderId, receiverId, text, date, isRead) {
        this.senderId = senderId
        this.receiverId = receiverId
        this.text = text
        this.date = date
        this.isRead = isRead
    }

    set setSenderId(senderId) {
        this.senderId = senderId
    }

    get getSenderId() {
        return this.senderId
    }

    set setReceiverId(receiverId) {
        this.receiverId = receiverId
    }

    get getReceiverId() {
        return this.receiverId
    }

    set setText(text) {
        this.text = text
    }

    get getText() {
        return this.text
    }

    set setDate(date) {
        this.date = date
    }

    get getDate() {
        return this.date
    }

    set setIsRead(isRead) {
        this.isRead = isRead
    }

    get getIsRead() {
        return this.isRead
    }
}

module.exports = Message