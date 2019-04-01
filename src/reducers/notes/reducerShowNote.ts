import { SHOW_NOTE_SUCCESS, SHOW_NOTE_FAILURE, SHOW_NOTE_CLEAR } from '../../actions/actionTypes';
import { ActionShowNote } from '../../actions/notes/actionShowNote';
import { MNote } from '../../models/notes';

export interface IShowNote {
    success: boolean;
    note: MNote[]
}

const INITIAL_STATE: IShowNote = {
    note: [],
    success: false
};

const reducerShowNote = (state: IShowNote = INITIAL_STATE, action: ActionShowNote): IShowNote => {
    switch (action.type) {
        case SHOW_NOTE_SUCCESS:
            return { ...state, note: action.note, success: true };
        case SHOW_NOTE_FAILURE:
            return { ...state, note: [], success: false };
        case SHOW_NOTE_CLEAR:
            return { ...state, note: [], success: false };
        default:
            return { ...state };
    }
};

export default reducerShowNote;
