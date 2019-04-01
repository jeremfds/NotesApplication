import { CREATE_NOTE_SUCCESS, CREATE_NOTE_CLEAR, CREATE_NOTE_FAILURE } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';

export interface ActionCreateNote extends Action<string> {}

const createNoteSuccess = (): ActionCreateNote => ({
    type: CREATE_NOTE_SUCCESS
});

const createNoteFailure = (): ActionCreateNote => ({
   type: CREATE_NOTE_FAILURE
});

export const clearCreateNote = (): ActionCreateNote => ({
   type: CREATE_NOTE_CLEAR
});

export const createNote = (note: MNote): RTAction<void> => (dispatch: RTDispatch) => {
    const storage = window.localStorage;
    if (storage) {
        const notes: MNote[] = JSON.parse(<string>storage.getItem(NOTES));
        let newNote: string;
        if (notes === null || Array.empty(notes)) {
            newNote = JSON.stringify([note]);
        } else {
            notes.push({...note, id: notes.length + 1});
            newNote = JSON.stringify(notes);
        }
        localStorage.setItem(NOTES, newNote);
        dispatch(createNoteSuccess());
    } else {
        dispatch(createNoteFailure());
    }
};