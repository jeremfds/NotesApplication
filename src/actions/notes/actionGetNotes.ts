import { GET_NOTES_ARRAY, GET_NOTES_EMPTY, GET_NOTES_FAILURE, GET_NOTES_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';
import CryptoJS, { DecryptedMessage } from 'crypto-js';

export interface ActionGetNotes extends Action<string> {
    notes?: MNote[];
}

const getNotesArray = (notes: MNote[]): ActionGetNotes => ({
    type: GET_NOTES_ARRAY,
    notes
});

const getNotesEmpty = (): ActionGetNotes => ({
    type: GET_NOTES_EMPTY
});

const getNotesFailure = (): ActionGetNotes => ({
    type: GET_NOTES_FAILURE
});

export const clearGetNotes = (): ActionGetNotes => ({
   type: GET_NOTES_CLEAR
});

export const getNotes = (): RTAction<void> => (dispatch: RTDispatch) => {
    const storage = window.localStorage;
    if (storage) {
        const getItem: string = storage.getItem(NOTES);
        if (getItem) {
            const bytes: DecryptedMessage = CryptoJS.AES.decrypt(getItem, 'jeremy');
            const originalText: string = bytes.toString(CryptoJS.enc.Utf8);
            const notes: MNote[] = JSON.parse(originalText);
            dispatch(getNotesArray(notes.reverse()));
        } else {
            dispatch(getNotesEmpty());
        }
    } else {
        dispatch(getNotesFailure());
    }
};