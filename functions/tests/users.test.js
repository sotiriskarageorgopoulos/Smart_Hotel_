const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const {
    validateEmailAndPassword
} = require('../util/helper_functions')

suite('Users handler testing...', () => {
    suite('Unit Tests', () => {
        /**
         * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com> 
         */
        suite('Testing validateEmailAndPassword() function...', () => {
            test('Checking a valid user...', () => {
                let validUser = {
                    password: '152562hshsh',
                    email: 'test@example.com'
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(validUser.email, validUser.password)

                assert.isTrue(valid, "The user's credentials is valid...")
                assert.deepEqual(errors, {}, 'There is no error...')
            })

            test('Checking a user with invalid password...', () => {
                let inValidUser = {
                    password: '',
                    email: 'test@example.com'
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(inValidUser.email, inValidUser.password)

                assert.isFalse(valid, "The user's password is invalid...")
                assert.strictEqual(errors.password, 'Must not be empty!')
                assert.deepEqual(errors, {
                    password: 'Must not be empty!'
                })
            })

            test("Checking a user with invalid email...", () => {
                let inValidUser = {
                    password: '173bsqgd1',
                    email: 'testexamplecom'
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(inValidUser.email, inValidUser.password)

                assert.isFalse(valid, "The user's email is invalid...")
                assert.strictEqual(errors.email, 'Must be a valid a address!')
                assert.deepEqual(errors, {
                    email: 'Must be a valid a address!'
                })
            })

            test("Checking a user without email...", () => {
                let inValidUser = {
                    password: '173bsqgd1',
                    email: ''
                }

                let {
                    errors,
                    valid
                } = validateEmailAndPassword(inValidUser.email, inValidUser.password)

                assert.isFalse(valid, "The user's email is empty string...")
                assert.strictEqual(errors.email, 'Email must not be empty!')
                assert.deepEqual(errors, {
                    email: 'Email must not be empty!'
                })
            })
        })
    })

    suite('Functional Tests', () => {
         /**
         * @author Sotiris Karageorgopoulos <sotiriskarageorgopoulos@gmail.com> 
         */
        suite('POST /login', () => {
            test('Testing login endpoint...', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .post('/api/login')
                    .type('form')
                    .send({
                        email: "john@domain.com",
                        password: "123456"
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.strictEqual(Object.keys(res.body).length, 1)
                        done()
                    })
            })
        })

        
    })
     /**
     * @author George Koulos
     */
      suite('GET/getRoomsByType', () => {
        test('Testing getRoomsByType endpoint', (done) => {
            chai
                .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                .get('/api/getRoomsByType/double')
                .type('form')
                .end((err, res) => {
                    assert.equal(res.status, 200, 'Response status should be 200...')
                    assert.isAtLeast(res.body.length, 1)
                    done()
                })
        })
    })
        /**
     * @author George Koulos
     */
         suite('GET/getRoomsUntilPrice', () => {
            test('Testing getRoomsUntilPrice endpoint', (done) => {
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .get('/api/getRoomsUntilPrice/70')
                    .type('form')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.isAtLeast(res.body.length, 1)
                        done()
                    })
            })
        })
          /**
     * @author George Koulos
     */
           suite('GET/getCustomer', () => {
            test('Testing getCustomer endpoint', (done) => {
            let customer = {
                    "birthDate": "1948-06-07T00:00:00.000Z",
                    "password": "123456",
                    "userId": "ZYioRvOtwNRDzX9DFlgS8WiCKHy1",
                    "bonusPoints": 0,
                    "name": "Hlias",
                    "blackListed": false,
                    "image": "https://firebasestorage.googleapis.com/v0/b/smart-hotel-7965b.appspot.com/o/no-img.png?alt=media&token=57ccaa66-55b5-41b3-b5b7-57d46f424609",
                    "surname": "Panagoulis",
                    "nationality": "Greece",
                    "email": "panago@gmail.com",
                    "tel": "2105656233"
                }
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6')
                    .get('/api/getCustomer/ZYioRvOtwNRDzX9DFlgS8WiCKHy1')
                    .type('form')
                    .end((err, res) => {
                        assert.equal(res.status, 200, 'Response status should be 200...')
                        assert.deepEqual(res.body, customer)
                        done()
                    })
            })
        })    
})