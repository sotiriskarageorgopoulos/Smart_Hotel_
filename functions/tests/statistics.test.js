const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');
const Customer = require('../model/customer')

chai.use(chaiHttp)

suite('Statistics handler testing...', () => {
    suite('Unit Tests', () => {
        
    })

    suite('Functional Tests', () => {
        /**
         * @author Tassou Venetia
         */
        suite('Testing get csutomers by nationality..', () => {
            test('test to get customer by nationality', (done) => {
                chai
                    .request("http://localhost:5000/smart-hotel-7965b/europe-west6/api")
                    .get(`/numberOfCustomersByNationality`)
                    .end((err, res) => {
                        assert.equal(res.statusCode, 200, "response must be 200")
                        assert.isAtLeast(res.body.length, 1)
                        done()
                    })

            })

    })
})
})
