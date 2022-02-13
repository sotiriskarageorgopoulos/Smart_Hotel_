const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const ReceptionistNote = require('../model/receptionistNote')

suite('Receptionist handler testing...', () => {
    suite('Unit Tests', () => {

    })

    suite('Functional Tests', () => {
        /**
        * @author Venetia Tassou
        */
        suite('POST /postNotesAboutReservation', () => {
            test('Testing postNotesAboutReservation endpoint...', (done) => {
                let note = new ReceptionistNote("kakakdakdj", "sjfjsfs", "2022-01-16T09:58:54.932Z", "mpla mpla mpla")
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .post(`/postNotesAboutReservation`)
                    .send(JSON.parse(JSON.stringify(note)))
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.strictEqual(res.text, `The notes of the reservation ${note.reservationId} has been added`)
                        done()
                    })
            })
        })

        /**
        * @author Giorgos Koulos
        */
        suite('GET /getNotesAboutReservation', () => {
            test('Testing getNotesAboutReservation endpoint...', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .get(`/getNotesAboutReservation/oTfsqXgR1Y3d3EPjs1C7`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.equal(Object.keys(res.body).length,4)
                        done()
                    })
            })
        })

         /**
        * @author Dimitris Michailidis
        */
          suite('DELETE /delNotesAboutReservation', () => {
            test('Testing delNotesAboutReservation endpoint...', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .delete(`/delNotesAboutReservation/sjfjsfs`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.equal(res.text,`The receptionist note with reservation id sjfjsfs deleted successfully...`)
                        done()
                    })
            })
        })

    })
})