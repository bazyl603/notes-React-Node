import { AuthTypes, NotesTypes, NoteTypes } from './actionTypes';

interface StartAction {
    type: AuthTypes.AUTH_START;
}
interface SuccessAction {
    type: AuthTypes.AUTH_SUCCESS;
    token: string;
    userId: string;
    error: null;
    loading: boolean;
    authRedirectPath: string;
}
interface FailAction {
    type: AuthTypes.AUTH_FAIL;
    token: null;
    userId: null;
    error: string;
    loading: boolean;
    authRedirectPath: string;
}
interface LogoutAction {
    type: AuthTypes.AUTH_LOGOUT;
    token: null;
    userId: null;
    error: null;
    loading: boolean;
    authRedirectPath: string;
}

export type AuthAction = StartAction | SuccessAction | FailAction | LogoutAction;

interface LoadingNotes {
    type: NotesTypes.NOTES_LOADING;
}

interface SuccessNotes {
    type: NotesTypes.NOTES_GET_SUCCESS;
    error: null;
    loading: boolean;
    notes: [];
}

interface FailNotes {
    type: NotesTypes.NOTES_GET_FAIL;
    error: string;
    loading: boolean;
    notes: null;
}

interface ClearNotes {
    type: NotesTypes.NOTES_CLEAR;
    error: string;
    loading: boolean;
    notes: null;
}

export type NotesAction = LoadingNotes | SuccessNotes | FailNotes | ClearNotes;

interface LoadingNote {
    type: NoteTypes.NOTE_LOADING;
}

interface SetNote {
    type: NoteTypes.NOTE_SET;
    description: string;
    id: string;
    created: string;
    lastEdit: string;
}

interface FailNote {
    type: NoteTypes.NOTE_FAIL;
    description: string;
    id: string;
    created: string;
    lastEdit: string;
}

interface ClearNote {
    type: NoteTypes.NOTE_CLEAR;
    description: string;
    id: string;
    created: string;
    lastEdit: string;
}

export type NoteAction = LoadingNote | SetNote | FailNote | ClearNote;