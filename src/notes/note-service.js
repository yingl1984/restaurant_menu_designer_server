const NotesService = {
    getAllNotes(knex) {
      return knex.select('*').from('notebook')
    },
    addNewNote(knex, newNote) {
      return knex
        .insert(newNote)
        .into('notebook')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    getNoteById(knex, noteId) {
      return knex('notebook')
        .select('*')
        .where('id', noteId)
        .first()
    },
    deleteNote(knex, noteId) {
      return knex('notebook')
        .where('id', noteId)
        .delete()
    },
    updateNote(knex, noteId, newNoteData) {
      return knex('notebook')
        .where('id', noteId)
        .update(newNoteData)
    }
  }
  
  module.exports = NotesService;