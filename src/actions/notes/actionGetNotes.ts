import { GET_NOTES_ARRAY, GET_NOTES_EMPTY, GET_NOTES_FAILURE, GET_NOTES_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';

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
        const notes: MNote[] = JSON.parse(storage.getItem(NOTES));
        if (notes === null || Array.empty(notes)) {
            dispatch(getNotesEmpty());
        } else {
            dispatch(getNotesArray(notes));
        }
    } else {
        dispatch(getNotesFailure());
    }
};