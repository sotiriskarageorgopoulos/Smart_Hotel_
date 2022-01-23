const chai = require('chai')
const assert = chai.assert
const chaiHttp = require('chai-http');

chai.use(chaiHttp)
suite('Functional Tests', () => {
suite('Administrator handler testing...', () => {
    suite('Unit Tests', () => {

    })
    })    
        /**
         * @author Georgios Koulos
         */
         suite('PUT/updateRoomPrice', () => {
            test('Testing the updateRoomPrice endpoint...', (done) => {
        
                chai
                    .request('http://localhost:5000/smart-hotel-7965b/europe-west6/api')
                    .put('/updateRoomPrice/104')
                    .type('form')
                    .send({price:'80'})
                    .end((err,res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        assert.strictEqual(res.text,`room price for roomId 104 updated successfully!`)
                        done()
                    })
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
                .end((err,res) => {
                    assert.equal(res.status,200,'Response status should be 200...')
                    assert.strictEqual(res.text,`price with discount for roomId 104 updated successfully!`)
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
                    
                        availability : true,
                        capacity : 2,
                        description : "double room with large balcony",
                        image : "",
                        price : 70 ,
                        roomId : "105",
                        services : ["breakfast"],
                        size : 40,
                        type : "double"
                })
                .end((err,res) => {
                    assert.equal(res.status,200,'Response status should be 200...')
                    assert.strictEqual(res.text,`Room with roomId 105 added succesfully!`)
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
                    .end((err,res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        assert.strictEqual(res.text,`The room with roomId 105 was deleted successfully!`)
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
                    .send({services: ["breakfast","fireplace"]})
                    .end((err,res) => {
                        assert.equal(res.status,200,'Response status should be 200...')
                        assert.strictEqual(res.text,`room with roomId 103 updated successfully!`)
                        done()
                    })
            })
        })           
    })

})


               

    
    
