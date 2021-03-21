export enum AuthTypes {
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL',
    AUTH_LOGOUT = 'AUTH_LOGOUT',

    SET_AUTH_REDIRECT_PATH = 'SET_AUTH_REDIRECT_PATH'
}

export enum NotesTypes {
    NOTES_LOADING = 'NOTES_LOADING',
    NOTES_GET_SUCCESS = 'NOTES_GET_SUCCESS ',
    NOTES_GET_FAIL = 'NOTES_GET_FAIL',
    NOTES_CLEAR = 'NOTES_CLEAR'
}

export enum NoteTypes {
    NOTE_LOADING = 'NOTE_LOADING',
    NOTE_SET = 'NOTE_SET',
    NOTE_FAIL = 'NOTE_FAIL',
    NOTE_CLEAR = 'NOTE_CLEAR'
}