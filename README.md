## Smart Hotel

## Run Locally

Clone the project

```bash
  git clone --branch back-end https://github.com/sotiriskarageorgopoulos/Smart_Hotel.git  
```

Go to the functions directory & install dependencies

```bash
  npm install
```

Start functions emulator at the port 5000

```bash
  firebase serve
```

## API Reference

#### Get number of reservations by date

```http
  GET /reservationsByDate
```

#### Get reservations income by date

```http
  GET /incomeByDate
```

#### Get room with maximum reservations

```http
  GET /roomWithMaxReservations
```

#### Get number of reservations by month

```http
  GET /reservationsByMonth
```

#### Get number of customers by nationality

```http
  GET /numberOfCustomersByNationality
```

#### Get k most demand rooms

```http
  GET /mostDemandRooms/:number
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `number` | `number` | **Required**. The k most demand rooms|

#### Update room price by roomId

```http
  PUT /updateRoomPrice/:roomId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|

#### Update room price with discount by roomId

```http
  PUT /updateRoomPriceWithDiscount/:roomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|

#### Upgrade room in a reservation 

```http
  PUT /upgradeRoomReservation/:reservationId/:updRoomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `reservationId` | `string` | **Required**. The reservation id|
| `updRoomId` | `string` | **Required**. The room id|

#### Change room availability
```http
  PUT /changeRoomAvailability/:roomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|

#### Insert room
```http
  POST /room
```

#### Delete room by roomId
```http
  DELETE /deleteRoom/:roomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|

#### Update details of room by roomId
```http
  PUT /updateRoomDetails/:roomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|

#### Add a customer to black list by userId
```http
  PUT /postBlacklistedCustomer/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|

#### Remove a customer from black list by userId
```http
  PUT /removeBlacklistedCustomer/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|

#### Get all customers
```http
  GET /getAllCustomers
```

#### Add room service by roomId
```http
  POST /addService/:roomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|

#### Delete room service by roomId and service name
```http
  DELETE /deleteService/:roomId/:service
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|
| `service` | `string` | **Required**. The name of service|

#### Do login
```http
  POST /login
```

#### Get a user
```http
  GET /user/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|

#### Get senders of a receiver by receiverId
```http
  GET /getSenders/:receiverId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `receiverId` | `string` | **Required**. The receiver id|

#### Get messages between two persons by receiverId & senderId
```http
  GET /getMessages/:receiverId/:senderId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `receiverId` | `string` | **Required**. The receiver id|
| `senderId` | `string` | **Required**. The sender id|

#### Update a message that it is read
```http
  PUT /updIsReadMessages/:receiverId/:senderId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `receiverId` | `string` | **Required**. The receiver id|
| `senderId` | `string` | **Required**. The sender id|

#### Get all rooms
```http
  GET /rooms
```

#### Get room by roomId
```http
  GET /room/:roomId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `roomId` | `string` | **Required**. The room number|


#### Get all reviews
```http
  GET /reviews
```

#### Get review by reviewId
```http
  GET /review/:revId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `revId` | `string` | **Required**. The review id|


#### Get customer by userId
```http
  GET /getCustomer/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|

#### Get all reservations of hotel
```http
  GET /getAllReservationsOfHotel
```

#### Get reservation of hotel
```http
  GET /getReservationOfHotel/:resId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resId` | `string` | **Required**. The reservation id|

#### User sends message
```http
  POST /sendMessage
```


#### Update the decision of receptionist or admin about reservation.
```http
  PUT /updateReservationDecision/:resId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resId` | `string` | **Required**. The reservation id|

#### Update user profile details.
```http
  PUT /updateProfileDetails/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|


#### Checks if a room is available based on reservations
```http
  PUT /checkAvailabilityOfRooms
```

#### Delete review by reviewId
```http
  DELETE /deleteReview/:revId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `revId` | `string` | **Required**. The review id|

#### Get reservations of a customer by userId
```http
  GET /reservations/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|

#### Get reservation of a customer by userId and reservationId
```http
  GET /reservation/:resId/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|
| `resId` | `string` | **Required**. The reservation id|

#### Get available rooms
```http
  GET /availableRooms
```

#### Get customer's bonus by userId
```http
  GET /getCustomerBonus/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. The user id|

#### Get rooms by type
```http
  GET /getRoomsByType/:type
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Required**. The room type|

#### Get rooms until a max price
```http
  GET /getRoomsUntilPrice/:price
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `price` | `number` | **Required**. The maximum price|

#### Add a new review
```http
  POST /postReview
```

#### Get available rooms by a date
```http
  GET /getAvailableRoomsByDate/:date
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `string` | **Required**. A date|

#### Make a reservation
```http
  POST /doReservation
```

/register

#### Do register
```http
  POST /register
```

#### Update review by reviewId
```http
   PUT /updateReview/:revId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `revId` | `string` | **Required**. the review id|


#### Update customer's bonus by userId
```http
   PUT /updateCustomerBonus/:userId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. the user id|

#### Customer cancels reservation
```http
   DELETE /cancelReservation/:resId
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resId` | `string` | **Required**. the reservation id|

#### Receptionist adds notes about a reservation
```http
   POST /postNotesAboutReservation
```

#### Get reservation's notes by reservation id
```http
  GET /getNotesAboutReservation/:resId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resId` | `string` | **Required**. the reservation id|

#### Delete notes about a reservation by reservation id
```http
  DELETE /delNotesAboutReservation/:resId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resId` | `string` | **Required**. the reservation id|

## Author
[Sotiris Karageorgopoulos](https://github.com/sotiriskarageorgopoulos)
