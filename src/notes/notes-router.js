const express = require('express');
const path = require('path');
const xss = require('xss');
const NotesService = require('./note-service');

const notesRouter = express.Router();
const jsonParser = express.json();

const noteFormat = note => ({
  id:xss(note.id),
  address: xss(note.address),
  state: xss(note.state),
  zipcode: xss(note.zipcode),
  status: xss(note.status),
  price: xss(note.price),
  comments:xss(note.comments),
});

notesRouter.route('/')
  .get((req, res, next) => {
    NotesService.getAllNotes( req.app.get('db') )
    .then(notes => { res.json(notes.map(noteFormat)) })
    .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { address, state, zipcode, status, price,comments } = req.body;
    const newNoteInfo = { address, state, zipcode, status};

    for (const [key, value] of Object.entries(newNoteInfo)) {
        if (value == null) {
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
            })
        }
    }
    newNoteInfo.price = price
    newNoteInfo.comments = comments

    NotesService.addNewNote( req.app.get('db'), newNoteInfo)
      .then(note => {
        res.status(201)
        .location(path.posix.join(req.originalUrl +`/${note.id}`))
        .json(noteFormat(note))
      })
      .catch(next)
  })

  notesRouter.route('/:note_id')
    .all((req, res, next) => {
      NotesService.getNoteById( req.app.get('db'), req.params.note_id )
        .then(note => {
          if(!note) { return res.status(404).json({error: {message: 'Note does not exist'} }) }
          res.note = note;
          next();
        })
        .catch(next)
    })
    .get((req, res, next) => {
      return res.json(noteFormat(res.note))
    })
    .delete((req, res, next) => {
      NotesService.deleteNote( req.app.get('db'), req.params.note_id )
      .then(() => { res.status(204).end() })
      .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
      const { status, price,comments } = req.body
      const noteToUpdate = { status, price,comments }
  
      const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).send("Nothing is updated");
        NotesService.updateNote(
        req.app.get('db'),
        req.params.note_id,
        noteToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
  

module.exports = notesRouter;