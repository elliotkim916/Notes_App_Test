import {
  GET_NOTES,
  GET_NOTE_BY_ID,
  ADD_NOTE,
  DELETE_NOTE,
  NOTES_ERROR
} from '../actions/notes';

const initialState = {
  notes: [],
  note: '',
  loading: false,
  error: null
};

export function notesReducer(state=initialState, action) {
  if (action.type === GET_NOTES) {
    return Object.assign({}, state, {
      notes: [...action.notes].reverse()
    })
  } else if (action.type === GET_NOTE_BY_ID) {
    return Object.assign({}, state, {
      note: action.note
    })
  } else if (action.type === ADD_NOTE) {
    return Object.assign({}, state, {
      notes: [action.note, ...state.notes]
    })
  } else if (action.type === DELETE_NOTE) {
    return Object.assign({}, state, {
      notes: state.notes.filter(note => action.id !== note.id)
    })
  } else if (action.type === NOTES_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    })
  }
  return state;
}