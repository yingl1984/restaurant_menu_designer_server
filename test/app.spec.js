const { expect } = require('chai');
const knex = require('knex')
const app = require('../src/app')
const NotesService = require('../src/notes/note-service');

describe('Notebook Endpoints', () => {
  let db;
  before(()=>{
     db = knex({
      client: 'pg',
      connection: 'postgresql://dunder_mifflin1:lovebaobao040117@localhost/rental-property-notebook-test',
    })
  app.set('db', db);

  })
  after('disconnect from db', () => db.destroy())
  before('clean the table', () => db('notebook').truncate())

  context('Given there are notes in the database',()=>{
  beforeEach(()=>{
    NotesService.addNewNote(db, 
      {
        id: 1,
        address: '1234 NE 31st Way',
        state: 'WA',
        zipcode: '90878',
        status: 'rent',
        price: 3200,
        comments: 'The tenant plan to rent for 2 years above'
       }
      )
      NotesService.addNewNote(db, 
        {
          id: 2,
          address: '800987 SE 31st Way',
          state: 'GA',
          zipcode: '10001',
          status: 'vacant',
          price: 0,
          comments: 'New townhouse'
         }
        )
  })

  afterEach(()=>{
    db('notebook').truncate()
  })

  it('GET /api/notes responds with 200 and all of the notes', () => {    
    const dat = supertest(app)
   .get('/api/notes');
    expect(200);
    expect(dat.length == 2);
    expect(dat.address, "1234 NE 31st Way");
    expect(dat.state,"GA");
    expect(dat.price, 0);
    expect(dat.comments,"One family with 3 members living in");
    expect(dat.comments,"New townhouse");
  })
  it('GET /api/notes/1 responds with 200 and specific note', () => {    
    const dat = supertest(app)
   .get('/api/notes/1');
    expect(dat.id == 1)
    
  })
  it('POST /api/notes, creates an note, responding with 201 and the new note', () => {    
    const dat = supertest(app)
   .post('/api/notes')
   .send({
    id: 3,
    address: 'newly posted address',
    state: 'Fl',
    zipcode: '99999',
    status: 'vacant',
    price: 0,
    comments: 'newly posted comments'
   });
    expect(dat.length == 3);
    expect(201);
    expect(dat.state,"FL");
    expect(dat.comments,"newly posted comments");
  })
  it('DELETE /api/notes/1 responds with 200 and specific note', () => {    
    const dat = supertest(app)
   .delete('/api/notes/1');
    expect(dat.length == 0);
    expect(201);
  })
  it('PATCH /api/notes/1 responds with 204 and updates the note', () => { 
    const idToUpdate = 1
       const updateNote = {
        address: 'updated note address',
        state: 'updated note state',
        status: 'rent',
        price: 11111,
        comments: 'updated note comments'
       }   
    const dat = supertest(app)
   .delete(`/api/notes/${idToUpdate}`)
   .send(updateNote);
    expect(dat.length == 0);
    expect(204);
  })

})
})