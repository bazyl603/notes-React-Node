import axios from 'axios';
import { Dispatch } from 'redux';
import { NoteTypes } from '../actionTypes/index';

export const loadingNote = () => {
  return {
    type: NoteTypes.NOTE_LOADING
  }
}

export const failNote = (error: string) => {
  return {
      type: NoteTypes.NOTE_FAIL
  }
}

export const clearNote = () => {
  return {
    type: NoteTypes.NOTE_CLEAR
  }
}

export const setNote = (description: string, id: string, created: string, lastEdit: string) => {
  return {
    type: NoteTypes.NOTE_SET,
    description: description,
    id: id,
    created: created,
    lastEdit: lastEdit
  }
}

export const createNote = (userId: string, token: string, description: string, created:  string, lastEdit: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadingNote());

    axios.post('http://localhost:8080/notes',{
      userId: userId,
      description: description
    },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
          dispatch(setNote(description, res.data.noteId.id, created, lastEdit));
      }).catch(err => {
          dispatch(failNote(err));
      });
  }
}

export const editNote = (userId: string, token: string, noteId: string, description: string, created:  string, lastEdit: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(loadingNote());

    axios.put('http://localhost:8080/notes', {
      userId: userId,
      description: description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        noteId: noteId
      }
    }).then(res => {
      dispatch(setNote(description, res.data.noteId.id, created, lastEdit));
  }).catch(err => {
      dispatch(failNote(err));
  });
  }
}