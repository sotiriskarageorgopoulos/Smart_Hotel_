class Room {
    constructor(roomsIds, type, descreption, services, capacity, size, availability, image, price) {
        this.roomsIds = roomsIds
        this.type = type
        this.descreption = descreption
        this.services = services
        this.capacity = capacity
        this.size = size
        this.availiability = availability
        this.image = image
        this.price = price
    }

    set setRoomId(roomsIds) {
        this.roomsIds = roomsIds
    }

    get getRoomsIds() {
        return this.roomsIds
    }

    set setType(type) {
        this.type = type
    }

    get getType() {
        return this.type
    }

    set setDescreption(descreption) {
        this.descreption = descreption
    }

    get getDescpretion() {
        return this.descreption
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

    get getAvailiability() {
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