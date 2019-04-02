import { CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE, CREATE_NOTE_CLEAR } from '../../actions/actionTypes';
import { ActionCreateNote } from '../../actions/notes/actionCreateNote';

export interface ICreateNote {
    success: boolean;
    notCompatible: boolean;
}

const INITIAL_STATE: ICreateNote = {
    success: false,
    notCompatible: false
};

const reducerCreateNote = (state: ICreateNote = INITIAL_STATE, action: ActionCreateNote): ICreateNote => {
    switch (action.type) {
        case CREATE_NOTE_SUCCESS:
            return { ...state, success: true, notCompatible: false };
        case CREATE_NOTE_FAILURE:
            return { ...state, success: false, notCompatible: true };
        case CREATE_NOTE_CLEAR:
            return { ...state, success: false, notCompatible: false };
        default:
            return { ...state };
    }
};

export default reducerCreateNote;
