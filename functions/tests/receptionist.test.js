const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const ReceptionistNote = require('../model/receptionistNote')

suite('Receptionist handler testing...', () => {
    suite('Unit Tests', () => {
 
    })
    })
        /**
         * @author Venetia Tassou
         */   
    suite('Functional Tests', () => {
        suite('Testing ReceptionistNote', () => {
            test('Cheking valid data..', (done) => {
                let note = JSON.parse(JSON.stringify( new ReceptionistNote("kakakdakdj", "sjfjsfs", "2022-01-16T09:58:54.932Z", "mpla mpla mpla")))
                chai
                .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                .post(`/postNotesAboutReservation/${note.reservationId}`)
                .send (note)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200, "response must be 200")
                    assert.strictEqual(res.text,`The notes of the reservation ${note.reservationId} has been added`)
                    done()
                })
            })
        })

    })