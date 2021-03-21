import { NoteTypes } from '../actions/actionTypes';
import { NoteAction } from '../actions/action';

interface NoteState {
  error: boolean;
  loading: boolean;
  description: string;
  id: string | null;
  created: string | null;
  lastEdit: string | null;
}

const initState = {
  error: false,
  loading: false,
  description: '',
  id: null,
  created: null,
  lastEdit: null
}

const reducer = (state: NoteState = initState, action: NoteAction): NoteState => {
  switch (action.type) {
    case NoteTypes.NOTE_LOADING:
        return { error: false, loading: true, description: '', id: null, created: null, lastEdit: null };
    case NoteTypes.NOTE_SET:
        return { error: false, loading: false, description: action.description, id: action.id, created: action.created, lastEdit: action.lastEdit };
    case NoteTypes.NOTE_FAIL:
        return { error: true, loading: false, description: '', id: '', created: '', lastEdit: '' };
    case NoteTypes.NOTE_CLEAR:
        return { error: false, loading: false, description: '', id: null, created: null, lastEdit: null };
    default:
        return state;
  }
}

export default reducer;