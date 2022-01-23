const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

suite('Statistics handler testing...', () => {
    suite('Unit Tests', () => {
        
    })

    suite('Functional Tests', () => {
        /**
         * @author Dimitris Giannopoulos
         */
         suite('GET /incomeByDate', () => {
            test('Testing the getIncomeByDate endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/incomeByDate')
                    .end((err, res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        done()
                    })
            })
        })
        /**
         * @author Dimitris Giannopoulos
         */
         suite('GET /roomWithMaxReservations', () => {
            test('Testing the getRoomWithMaxReservations endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .get('/roomWithMaxReservations')
                    .end((err, res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        done()
                    })
            })
        })
    })
})
