import { DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE, DELETE_NOTE_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';
import CryptoJS, { DecryptedMessage } from 'crypto-js';

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
    const storage = window.localStorage;
    if (storage) {
        const getItem: string = storage.getItem(NOTES);
        if (getItem) {
            const bytes: DecryptedMessage = CryptoJS.AES.decrypt(getItem, 'jeremy');
            const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
            const notes: MNote[] = JSON.parse(originalText);
            const filteredArray: string = JSON.stringify(notes.filter(note => note.id !== id));
            const cacheString: string = CryptoJS.AES.encrypt(filteredArray, 'jeremy').toString();
            window.localStorage.setItem(NOTES, cacheString);
            dispatch(deleteNoteSuccess());
        } else {
            return null;
        }
    } else {
        dispatch(deleteNoteFailure());
    }

};