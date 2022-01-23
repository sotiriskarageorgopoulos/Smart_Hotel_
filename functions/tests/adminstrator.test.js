const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

suite('Administrator handler testing...', () => {
    suite('Unit Tests', () => {

    })

    suite('Functional Tests', () => {
        /**
         * @author Dimitris Michailidis <dimmichlds@gmail.com>
         */
        suite('/PUT doUnavailableRoom', () => {
            test('Testing doUnavailableRoom endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .put('/api/doUnavailableRoom/101')
                    .type('form')
                    .send({
                        availability: false
                    })
                    .end((err, res) => {
                        
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.notEqual(res.text,'Something went wrong...')
                            assert.isDefined(res.text)
                            assert.isOk(res.text)
                        done()
                    })
            })
        })
        suite('/PUT upgradeRoomReservation', () => {
            test('Testing upgradeRoomReservation endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .put('/api/upgradeRoomReservation/ghhghfhf')
                    .type('form')
                    .send({
                        roomId: ['101', '301']
                    })
                    .end((err, res) => {
                        if (res.status === 200) {
                            assert.equal(res.status, 200, 'Response status should be 200...')
                            assert.strictEqual(res.text, 'Reservation upgraded successfully')
                        }else{
                            assert.strictEqual(res.text, 'Reservation not found')
                        }
                        done()
                    })
            })
        })

    })
})