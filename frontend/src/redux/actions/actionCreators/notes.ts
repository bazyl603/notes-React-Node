import axios from 'axios';
import { Dispatch } from 'redux';
import { NotesTypes } from '../actionTypes/index';

export const loadingNotes = () => {
  return {
    type: NotesTypes.NOTES_LOADING
  }
}

export const failNotes = (error: string) => {
  return {
      type: NotesTypes.NOTES_GET_FAIL,
      error: error
  }
}

export const clearNotes = () => {
  return {
    type: NotesTypes.NOTES_CLEAR
  }
}

export const successNotes = (notes: any[]) => {
  return {
    type: NotesTypes.NOTES_GET_SUCCESS,
    notes: notes
  }
}

export const getNotes = (token: string, userId: string) => {
  return (dispatch: Dispatch<any>) => {
      dispatch(loadingNotes());
      
      axios.get('http://localhost:8080/notes',{
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          userId: userId
        }
      }).then(res => {
          const notes = res.data.notes;
          dispatch(successNotes([...notes]));
      }).catch(err => {
          dispatch(failNotes(err));
      });
  }
}