const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');

const Administrator = require('../model/administrator')
chai.use(chaiHttp)

suite('Administrator handler testing...', () => {
    suite('Unit Tests', () => {
        
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
                    assert.strictEqual(res.text,'Customer with customerID zTJyKwYSMEelU24s19b58BuJoAd2 updated succesfully!')
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
                            assert.strictEqual(res.text,'Customer with customerID zTJyKwYSMEelU24s19b58BuJoAd2 updated succesfully!')
                            done()
                        })
        
        
                    })
                })
    })

})
