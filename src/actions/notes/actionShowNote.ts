import { SHOW_NOTE_SUCCESS, SHOW_NOTE_FAILURE, SHOW_NOTE_CLEAR } from '../actionTypes';
import { RTAction, RTDispatch } from '../../roots';
import { Action } from 'redux';
import { NOTES } from '../../configs';
import { MNote } from '../../models/notes';

export interface ActionShowNote extends Action<string> {
    note?: MNote[]
}

const showNoteSuccess = (note: MNote[]): ActionShowNote => ({
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
    const notes: MNote[] = JSON.parse(<string>window.localStorage.getItem(NOTES));
    if (!notes === null || !Array.empty(notes)) {
        const filteredArray: MNote[] = notes.filter(note => note.id === id);
        dispatch(showNoteSuccess(filteredArray));
    } else {
        dispatch(showNoteFailure());
    }
};