import { CREATE_NOTE_SUCCESS, CREATE_NOTE_CLEAR } from '../ActionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';

export interface ActionCreateNote extends Action<string> {}

const createNoteSuccess = (): ActionCreateNote => ({
    type: CREATE_NOTE_SUCCESS
});

export const clearCreateNote = (): ActionCreateNote => ({
   type: CREATE_NOTE_CLEAR
});

export const createNote = (notes: MNote[], note: MNote): RTAction<void> => (dispatch: RTDispatch) => {
    let createNote;
    const newNote = {
        ...note,
        id: notes.length + 1,
    };
    notes.push(newNote);
    createNote = JSON.stringify(notes);
    localStorage.setItem(NOTES, createNote);
    dispatch(createNoteSuccess());
};