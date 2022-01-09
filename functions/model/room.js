import { RoomService } from "./roomService"
import { RoomType } from "./roomType"

export class Room {
    constructor(roomId, type, descreption, services, capacity, size, availability, image) {
        this.roomId = roomId
        this.type = type
        this.descreption = descreption
        this.services = services
        this.capacity = capacity
        this.size = size
        this.availiability = availability
        this.image = image
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

}