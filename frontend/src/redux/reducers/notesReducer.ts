import { NotesTypes } from '../actions/actionTypes';
import { NotesAction } from '../actions/action';

interface NotesState {
  error: string | null;
  loading: boolean;
  notes: any[] | null;
}

const initState = {
  error: null,
  loading: false,
  notes: null
}

const reducer = (state: NotesState = initState, action: NotesAction): NotesState => {
  switch (action.type) {
    case NotesTypes.NOTES_LOADING:
        return { error: null, loading: true, notes: [] };
    case NotesTypes.NOTES_GET_SUCCESS:
        return { error: null, loading: false, notes: action.notes };
    case NotesTypes.NOTES_GET_FAIL:
        return { error: action.error, loading: false, notes: null };
    case NotesTypes.NOTES_CLEAR:
        return { error: null, loading: false, notes: null };
    default:
        return state;
  }
}

export default reducer;