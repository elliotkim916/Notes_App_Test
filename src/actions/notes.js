import {API_URL} from '../config';

export const GET_NOTES = 'GET_NOTES';
export const getNotes = notes => ({
  type: GET_NOTES,
  notes
});

export const GET_NOTE_BY_ID = 'GET_NOTE_BY_ID';
export const getNoteById = note => ({
  type: GET_NOTE_BY_ID,
  note
});

export const ADD_NOTE = 'ADD_NOTE';
export const addNote = note => ({
  type: ADD_NOTE,
  note
});

export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = id => ({
  type: DELETE_NOTE,
  id
});

export const NOTES_ERROR = 'NOTES_ERROR';
export const notesError = error => ({
  type: NOTES_ERROR,
  error
});

export const fetchNotes = () => dispatch => {
  return (
    fetch(`${API_URL}/note`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
    .then(res => res.json())
    .then(notes => dispatch(getNotes(notes)))
    .catch(err => dispatch(notesError(err)))
  );
}

export const fetchNoteById = id => dispatch => {
  return (
    fetch(`${API_URL}/note/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      method: 'GET'
    })
    .then(res => res.json())
    .then(note => dispatch(getNoteById(note)))
    .then(err => dispatch(notesError(err)))
  );
}

export const addNewNote = (title, body) => dispatch => {
  return (
    fetch(`${API_URL}/note`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        "title": title,
        "body": body
      }),
      method: 'POST'
    })
    .then(res => res.json())
    .then(note => dispatch(addNote(note)))
    .catch(err => dispatch(notesError(err)))
  );
}

export const removeNote = id => dispatch => {
  return (
    fetch(`${API_URL}/note/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      method: 'DELETE'
    })
    .then(() => dispatch(deleteNote(id)))
    .catch(err => dispatch(notesError(err)))
  );
}