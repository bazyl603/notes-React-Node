import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notesReducer from './notesReducer';
import oneNoteReducer from './OneNoteReducer'

const reducers = combineReducers({
  auth: authReducer,
  notes: notesReducer,
  note: oneNoteReducer 
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;