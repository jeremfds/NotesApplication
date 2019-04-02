import { EDIT_NOTE_SUCCESS, EDIT_NOTE_FAILURE, EDIT_NOTE_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';

export interface ActionEditNote extends Action<string> {}

const editNoteSuccess = (): ActionEditNote => ({
    type: EDIT_NOTE_SUCCESS
});

const editNoteFailure = (): ActionEditNote => ({
    type: EDIT_NOTE_FAILURE
});

export const clearEditNote = (): ActionEditNote => ({
    type: EDIT_NOTE_CLEAR
});

export const editNote = (id: number, note: MNote): RTAction<void> => (dispatch: RTDispatch) => {
    const storage = window.localStorage;
    if (storage) {
        const notes: MNote[] = JSON.parse(storage.getItem(NOTES));
        const index: number = notes.findIndex(note => note.id === id);
        let newNote: string;
        notes[index] = (note);
        newNote = JSON.stringify(notes);
        localStorage.setItem(NOTES, newNote);
        dispatch(editNoteSuccess());
    } else {
        dispatch(editNoteFailure());
    }
};