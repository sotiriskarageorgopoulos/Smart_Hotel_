const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

suite('Statistics handler testing...', () => {
    suite('Unit Tests', () => {
        
    })

    suite('Functional Tests', () => {
     /**
     * @author George Koulos
     */
      suite('GET /reservationsByDate', () => {
        test('Testing the reservationsByDate endpoint...', (done) => {
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                .get('/reservationsByDate')
                .end((err, res) => {
                    assert.equal(res.status,200,'Response status should be 200...')
                    assert.isAtLeast(res.body.length, 1)
                    done()
                })
        })
    })
})
})
