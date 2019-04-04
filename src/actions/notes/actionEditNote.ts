import { EDIT_NOTE_SUCCESS, EDIT_NOTE_FAILURE, EDIT_NOTE_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';
import CryptoJS, { DecryptedMessage } from 'crypto-js';

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
        const getItem: string = storage.getItem(NOTES);
        if (getItem) {
            const bytes: DecryptedMessage = CryptoJS.AES.decrypt(getItem, 'jeremy');
            const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
            const notes: MNote[] = JSON.parse(originalText);
            const filteredArray: MNote[] = notes.filter(note => note.id !== id);
            let newNote: string;
            filteredArray.unshift(note);
            newNote = JSON.stringify(filteredArray);
            newNote = CryptoJS.AES.encrypt(newNote, 'jeremy').toString();
            localStorage.setItem(NOTES, newNote);
            dispatch(editNoteSuccess());
        } else {
            return null;
        }
    } else {
        dispatch(editNoteFailure());
    }
};