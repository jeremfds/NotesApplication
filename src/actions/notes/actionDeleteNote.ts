import { DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE, DELETE_NOTE_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';

export interface ActionDeleteNote extends Action<string> {}

const deleteNoteSuccess = (): ActionDeleteNote => ({
    type: DELETE_NOTE_SUCCESS
});

const deleteNoteFailure = (): ActionDeleteNote => ({
    type: DELETE_NOTE_FAILURE
});

export const clearDeleteNote = (): ActionDeleteNote => ({
   type: DELETE_NOTE_CLEAR
});

export const deleteNote = (id: number): RTAction<void> => (dispatch: RTDispatch) => {
    const notes: MNote[] = JSON.parse(<string>window.localStorage.getItem(NOTES));
    if (!notes === null || !Array.empty(notes)) {
        const filteredArray: string = JSON.stringify(notes.filter(note => note.id !== id));
        window.localStorage.setItem(NOTES, filteredArray);
        dispatch(deleteNoteSuccess());
    } else {
        dispatch(deleteNoteFailure());
    }
};