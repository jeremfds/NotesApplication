import { CREATE_NOTE_SUCCESS, CREATE_NOTE_CLEAR, CREATE_NOTE_FAILURE } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';
import CryptoJS, { DecryptedMessage } from 'crypto-js';

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
        const getItem: string = storage.getItem(NOTES);
        let newNote: string;
        if (getItem) {
            const bytes: DecryptedMessage = CryptoJS.AES.decrypt(getItem, 'jeremy');
            const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
            const notes: MNote[] = JSON.parse(originalText);
            const id: number = Math.max.apply(Math, notes.map((note => note.id)));
            notes.push({...note, id: id + 1});
            newNote = JSON.stringify(notes);
            newNote = CryptoJS.AES.encrypt(newNote, 'jeremy').toString();
            localStorage.setItem(NOTES, newNote);
            dispatch(createNoteSuccess());
        } else {
            newNote = JSON.stringify([note]);
            newNote = CryptoJS.AES.encrypt(newNote, 'jeremy').toString();
            localStorage.setItem(NOTES, newNote);
            dispatch(createNoteSuccess());
        }
    } else {
        dispatch(createNoteFailure());
    }
};