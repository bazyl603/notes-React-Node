import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notesReducer from './notesReducer';

const reducers = combineReducers({
  auth: authReducer,
  notes: notesReducer 
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;