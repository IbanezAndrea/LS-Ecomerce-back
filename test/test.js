const request = require('supertest')
const app = require('../app')

// describe('POST /user',function(){

        // it('Must respond with 200 status code', function (done){
        //     request(app)
        //     .post('/auth/signup')
        //     .send({
        //             "name":"Lord",
        //             "lastname": "Squidly",
        //             "email":"lsfoodco@gmail.com",
        //             "password":"contraseña",
        //             "photo":"https://t1.uc.ltmcdn.com/es/posts/2/1/5/significado_del_condor_como_animal_de_poder_48512_orig.jpg",
        //             "role":"admin",
        //             "from":"form",
        //             "addresses":["solano vivee"],
        //         })
        //     .expect(200)
        //     .end(function(err,res){
        //         if(err) return done(err)
        //         return done()
        //     })
        // })

        
    //     it('', function (done){
    //         request(app)
    //         .post('/auth/signup')
    //         .send({
                    
    //                 "email":"asdadsasd@gmail.com",
    //                 "password":"contraseña", 
    //                 "from":"form",

    //             })
    //         .expect(400)
    //         .end(function(err,res){
    //             if(err) return done(err)
    //             return done()
    //         })
    //     })
       
    // })


    describe('GET /recipes', function(){
        //   it('Must respond with the recipes', function(done){
        //     request(app)
        //     .get('/recipes')
        //     .auth('name')
        //     .set('Accept','application/json')
        //     .expect(200,done)
        //     console.log("first")
        //   })
          it('Must respond with the all recipes',function (done){
            request(app)
            .get('/recipes')
            .auth('id')
            .expect(200,done)
          })
        })