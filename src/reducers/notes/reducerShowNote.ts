import { SHOW_NOTE_SUCCESS, SHOW_NOTE_FAILURE, SHOW_NOTE_CLEAR } from '../../actions/actionTypes';
import { ActionShowNote } from '../../actions/notes/actionShowNote';
import { MNote } from '../../models/notes';

export interface IShowNote {
    success: boolean;
    note: MNote;
    notCompatible: boolean;
}

const INITIAL_STATE: IShowNote = {
    note: {},
    success: false,
    notCompatible: false
};

const reducerShowNote = (state: IShowNote = INITIAL_STATE, action: ActionShowNote): IShowNote => {
    switch (action.type) {
        case SHOW_NOTE_SUCCESS:
            return { ...state, note: action.note, success: true, notCompatible: false };
        case SHOW_NOTE_FAILURE:
            return { ...state, note: {}, success: false, notCompatible: true };
        case SHOW_NOTE_CLEAR:
            return { ...state, note: {}, success: false, notCompatible: false };
        default:
            return { ...state };
    }
};

export default reducerShowNote;
