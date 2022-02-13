/**
 * @author Dimitris Giannopoulos
 */
class Room {
    constructor(roomId, type, description, services, capacity, size, availability, image, price) {
        this.roomId = roomId
        this.type = type
        this.description = description
        this.services = services
        this.capacity = capacity
        this.size = size
        this.availability = availability
        this.image = image
        this.price = price
    }

    set setRoomId(roomId) {
        this.roomId = roomId
    }

    get getRoomId() {
        return this.roomId
    }

    set setType(type) {
        this.type = type
    }

    get getType() {
        return this.type
    }

    set setDescription(description) {
        this.description = description
    }

    get getDescription() {
        return this.description
    }

    set setServices(services) {
        this.services = services
    }

    get getServices() {
        return this.services
    }

    set setCapacity(capacity) {
        this.capacity = capacity
    }

    set setSize(size) {
        this.size = size
    }

    get getSize() {
        return this.size
    }

    set setAvailability(availability) {
        this.availability = availability
    }

    get getAvailability() {
        return this.availability
    }

    set setImage(image) {
        this.image = image
    }

    get getImage() {
        return this.image
    }

    set setPrice(price) {
        this.price = price
    }

    get getPrice() {
        return this.price
    }
}

module.exports = Room