const { expect } = require('chai');
const knex = require('knex')
const app = require('../src/app')
const MenuService = require('../src/menu/menu-service');

describe('Restaurant Menu designer Endpoints', () => {
  // Create a knex instance
  let db;
  before(()=>{
     db = knex({
      client: 'pg',
      connection: 'postgresql://dunder_mifflin1:lovebaobao040117@localhost/restaurant_menu_designer_test',
    })
    app.set('db', db);
  })

  //  Clean the table before the test suit start. Disconnect the db after it finished.
  after('disconnect from db', () => db.destroy())
  before('clean the table', () => db('menu_list').truncate())

  // Test the endpoints when the table has data.
  context('Given there are dishes in the database',()=>{
  // Insert the test data into table before the test suit run.
    beforeEach(()=>{
      MenuService.addNewDish(db, 
        {
          id: 1,
          name: 'bun',
          price: 1.99,
          rate: 2,
          comments: 'Pine apple bun'
        }
        )
        MenuService.addNewDish(db, 
          {
            id: 2,
            name: 'dumpling',
            price: 8.99,
            rate:5,
            comments: 'Chinese favorite plate'
          }
          )
    })
  // Clean the table after it runs
    afterEach(()=>{
      db('menu_list').truncate()
    })
  // Test the Get endpoint
    it('GET /api/menu responds with 200 and all of the dishes', () => {    
      const dat = supertest(app)
    .get('/api/menu');
      expect(200);
      expect(dat.length == 2);
      expect(dat.name, "bun");
      expect(dat.rate, 5);
      expect(dat.price, 8.99);
      expect(dat.comments,"Chinese");
    })
    it('GET /api/menu/1 responds with 200 and specific dish', () => {    
      const dat = supertest(app)
    .get('/api/menu/1');
      expect(dat.id == 1)
      
    })
  // Test the Post endpoint
    it('POST /api/menu, creates a new dish, responding with 201 and the new dish', () => {    
      const dat = supertest(app)
    .post('/api/menu')
    .send({
      id: 3,
      name:'noodle',
      price: 10.9,
      rate:5,
      comments: 'newly posted dish'
    });
      expect(dat.length == 3);
      expect(201);
      expect(dat.price, 10.9);
      expect(dat.comments,"newly posted comments");
    })
  // Test the Delete endpoint
    it('DELETE /api/menu/1 responds with 200 and specific dish', () => {    
      const dat = supertest(app)
    .delete('/api/menu/1');
      expect(dat.length == 1);
      expect(201);
    })
  // Test the Patch endpoint
    it('PATCH /api/menu/1 responds with 204 and updates the dish', () => { 
      const idToUpdate = 1
        const updateDish = {
          name:'test patch',
          price: 11111,
          rate:21,
          comments: 'updated dish comments'
        }   
      const dat = supertest(app)
    .delete(`/api/menu/${idToUpdate}`)
    .send(updateDish);
      expect(dat.length == 2);
      expect(204);
    })
  })
})