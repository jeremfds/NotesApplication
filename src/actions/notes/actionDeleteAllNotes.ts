import { DELETE_ALL_NOTES_SUCCESS, DELETE_ALL_NOTES_FAILURE, DELETE_ALL_NOTES_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import CryptoJS, { WordArray } from 'crypto-js';

export interface ActionDeleteAllNotes extends Action<string> {}

const deleteAllNotesSuccess = (): ActionDeleteAllNotes => ({
    type: DELETE_ALL_NOTES_SUCCESS
});

const deleteAllNotesFailure = (): ActionDeleteAllNotes => ({
    type: DELETE_ALL_NOTES_FAILURE
});

export const clearDeleteAllNotes = (): ActionDeleteAllNotes => ({
    type: DELETE_ALL_NOTES_CLEAR
});

export const deleteAllNotes = (): RTAction<void> => (dispatch: RTDispatch) => {
    const storage = window.localStorage;
    if (storage) {
        const filteredArray: string = JSON.stringify([]);
        const cacheString: WordArray | string = CryptoJS.AES.encrypt(filteredArray, 'jeremy').toString();
        window.localStorage.setItem(NOTES, cacheString);
        dispatch(deleteAllNotesSuccess());
    } else {
        dispatch(deleteAllNotesFailure());
    }

};