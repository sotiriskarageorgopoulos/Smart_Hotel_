const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

suite('Administrator handler testing...', () => {
    suite('Unit Tests', () => {})

    suite('Functional Tests', () => {
        /**
         * @author Georgios Koulos
         */
        suite('PUT /updateRoomPrice', () => {
            test('Testing the updateRoomPrice endpoint...', (done) => {

                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .put('/updateRoomPrice/104')
                    .type('form')
                    .send({price: '80'})
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `room price for roomId 104 updated successfully!`)
                        done()
                    })
            })
        })

        /**
         * @author Georgios Koulos
         */
        suite('PUT/updateRoomPriceWithDiscount', () => {
            test('Testing the updateRoomPriceWithDiscount endpoint...', (done) => {

                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .put('/updateRoomPriceWithDiscount/104')
                    .type('form')
                    .send({discount: 0.10})
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `price with discount for roomId 104 updated successfully!`)
                        done()
                    })
            })
        })

        /**
         * @author Georgios Koulos
         */
        suite('POST/room', () => {
            test('Testing the postRoom endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .post('/room')
                    .type('form')
                    .send({
                        availability: true,
                        capacity: 2,
                        description: "double room with large balcony",
                        image: "",
                        price: 70,
                        roomId: "105",
                        services: ["breakfast"],
                        size: 40,
                        type: "double"
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(res.text, `Room with roomId 105 added succesfully!`)
                        done()
                    })
            })
            /**
             * @author Georgios Koulos
             */
            suite('DELETE/deleteRoom', () => {
                test('Testing thedeleteRoom endpoint...', (done) => {

                    chai
                        .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                        .delete('/deleteRoom/105')
                        .type('form')
                        .end((err, res) => {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.strictEqual(res.text, `The room with roomId 105 was deleted successfully!`)
                            done()
                        })
                })
                /**
                 * @author Georgios Koulos
                 */
                suite('PUT/updateRoomDetails', () => {
                    test('Testing the updateRoomDetails endpoint...', (done) => {

                        chai
                            .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                            .put('/updateRoomDetails/103')
                            .type('form')
                            .send({
                                services: ["breakfast", "fireplace"]
                            })
                            .end((err, res) => {
                                assert.equal(res.status, 200, 'Response status should be 200...')
                                assert.strictEqual(res.text, `room with roomId 103 updated successfully!`)
                                done()
                            })
                    })
                })
                suite('Functional Tests', () => {
                    /**
                     * @author Tassou Venetia
                     */
                    suite('Testing to post blacklisted costumer', () => {
                        test('test to post blacklisted costumer', (done) => {
                            chai
                                .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                                .put(`/postBlacklistedCustomer/zTJyKwYSMEelU24s19b58BuJoAd2`)
                                .end((err, res) => {
                                    assert.equal(res.statusCode, 200, "response must be 200")
                                    assert.strictEqual(res.text, 'Customer with customerID zTJyKwYSMEelU24s19b58BuJoAd2 updated succesfully!')
                                    done()
                                })

                        })
                    })
                    /**
                     * @author Dimitris Michailidis <dimmichlds@gmail.com>
                     */
                    suite('/PUT changeRoomAvailability', () => {
                        test('Testing changeRoomAvailability endpoint...', (done) => {
                            chai
                                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                                .put('/api/changeRoomAvailability/101')
                                .type('form')
                                .send({availability: false})
                                .end((err, res) => {
                                    assert.equal(res.status, 200, 'Response status should be 200...')
                                    assert.notEqual(res.text, 'Something went wrong...')
                                    assert.isDefined(res.text)
                                    assert.isOk(res.text)
                                    done()
                                })
                        })
                    })
                    /**
                     * @author Dimitris Michailidis <dimmichlds@gmail.com>
                     */
                    suite('/PUT upgradeRoomReservation', () => {
                        test('Testing upgradeRoomReservation endpoint...', (done) => {
                            chai
                                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                                .put('/api/upgradeRoomReservation/CPU3ztfgW4ApBgxrYwLI/302')
                                .type('form')
                                .send({roomId: '302'})
                                .end((err, res) => {
                                    if (res.status === 200) {
                                        assert.equal(res.status, 200, 'Response status should be 200...')
                                        assert.strictEqual(res.text, 'Reservation upgraded successfully...')
                                    } else {
                                        assert.strictEqual(res.text, 'No such Reservation')
                                    }
                                    done()
                                })
                        })
                    })

                    /**
                     * @author Tassou Venetia
                     */
                    suite('Testing to remove blacklisted costumer', () => {
                        test('test to remove blacklisted costumer', (done) => {
                            chai
                                .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                                .put(`/removeBlacklistedCustomer/zTJyKwYSMEelU24s19b58BuJoAd2`)
                                .end((err, res) => {
                                    assert.equal(res.statusCode, 200, "response must be 200")
                                    assert.strictEqual(res.text, 'Customer with customerID zTJyKwYSMEelU24s19b58BuJoAd2 updated succesfully!')
                                    done()
                                })

                        })
                    })
                })
                /**
                 * @author Tassou Venetia
                 */
                suite('Testing to remove blacklisted costumer', () => {
                    test('test to remove blacklisted costumer', (done) => {
                        chai
                            .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                            .put(`/removeBlacklistedCustomer/zTJyKwYSMEelU24s19b58BuJoAd2`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200, "response must be 200")
                                assert.strictEqual(res.text, 'Customer with customerID zTJyKwYSMEelU24s19b58BuJoAd2 updated succesfully!')
                                done()
                            })

                    })
                })

                /**
                 * @author Sotirios Karageorgopoulos
                 * @param {*} req
                 * @param {*} res
                */
                suite('GET /getAllCustomers', () => {
                    test('Testing getAllCustomers endpoint...', (done) => {
                        chai
                            .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                            .get(`/getAllCustomers`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200, "response must be 200")
                                assert.isAtLeast(res.body.length, 1)
                                done()
                            })
                    })
                })

                /**
                 * @author Sotirios Karageorgopoulos
                 * @param {*} req
                 * @param {*} res
                */
                suite('POST /addService', () => {
                    test('Testing addService endpoint...', (done) => {
                        chai
                            .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                            .post(`/addService/303`)
                            .send({
                                service: "Fridge"
                            })
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200, "response must be 200")
                                assert.equal(res.text, `Service added successfully...`)
                                done()
                            })
                    })
                })

                /**
                 * @author Sotirios Karageorgopoulos
                 * @param {*} req
                 * @param {*} res
                */
                suite('DELETE /deleteService', () => {
                    test('Testing addService endpoint...', (done) => {
                        chai
                            .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                            .delete(`/deleteService/303/Fridge`)
                            .end((err, res) => {
                                assert.equal(res.statusCode, 200, "response must be 200")
                                assert.equal(res.text, `Service removed successfully...`)
                                done()
                            })
                    })
                })
            })

        })

    })
})