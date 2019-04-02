import { DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE, DELETE_NOTE_CLEAR } from '../../actions/actionTypes';
import { ActionDeleteNote } from '../../actions/notes/actionDeleteNote';

export interface IDeleteNote {
    success: boolean;
    notCompatible: boolean;
}

const INITIAL_STATE: IDeleteNote = {
    success: false,
    notCompatible: false
};

const reducerDeleteNote = (state: IDeleteNote = INITIAL_STATE, action: ActionDeleteNote): IDeleteNote => {
    switch (action.type) {
        case DELETE_NOTE_SUCCESS:
            return { ...state, success: true, notCompatible: false };
        case DELETE_NOTE_FAILURE:
            return { ...state, success: false, notCompatible: true };
        case DELETE_NOTE_CLEAR:
            return { ...state, success: false, notCompatible: false };
        default:
            return { ...state };
    }
};

export default reducerDeleteNote;
