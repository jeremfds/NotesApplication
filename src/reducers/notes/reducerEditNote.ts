import { EDIT_NOTE_SUCCESS, EDIT_NOTE_FAILURE, EDIT_NOTE_CLEAR } from '../../actions/actionTypes';
import { ActionEditNote } from '../../actions/notes/actionEditNote';

export interface IEditNote {
    success: boolean;
    notCompatible: boolean
}

const INITIAL_STATE: IEditNote = {
    success: false,
    notCompatible: false
};

const reducerEditNote = (state: IEditNote = INITIAL_STATE, action: ActionEditNote): IEditNote => {
    switch (action.type) {
        case EDIT_NOTE_SUCCESS:
            return { ...state, success: true, notCompatible: false };
        case EDIT_NOTE_FAILURE:
            return { ...state, success: false, notCompatible: true };
        case EDIT_NOTE_CLEAR:
            return { ...state, success: false, notCompatible: false };
        default:
            return { ...state };
    }
};

export default reducerEditNote;
