import { SHOW_NOTE_SUCCESS, SHOW_NOTE_FAILURE, SHOW_NOTE_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';
import CryptoJS, { DecryptedMessage } from 'crypto-js';

export interface ActionShowNote extends Action<string> {
    note?: MNote
}

const showNoteSuccess = (note: MNote): ActionShowNote => ({
    type: SHOW_NOTE_SUCCESS,
    note
});

const showNoteFailure = (): ActionShowNote => ({
    type: SHOW_NOTE_FAILURE
});

export const clearShowNote = (): ActionShowNote => ({
    type: SHOW_NOTE_CLEAR
});

export const showNote = (id: number): RTAction<void> => (dispatch: RTDispatch) => {
    const storage = window.localStorage;
    if (storage) {
        const getItem: string = storage.getItem(NOTES);
        if (getItem) {
            const bytes: DecryptedMessage = CryptoJS.AES.decrypt(storage.getItem(NOTES), 'jeremy');
            const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
            const notes: MNote[] = JSON.parse(originalText);
            const filteredArray: MNote[] = notes.filter(note => note.id === id);
            const note: MNote = filteredArray[0];
            dispatch(showNoteSuccess(note));
        } else {
            return null;
        }
    } else {
        dispatch(showNoteFailure());
    }
};