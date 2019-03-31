import { CREATE_NOTE_SUCCESS, CREATE_NOTE_CLEAR } from '../../actions/ActionTypes';
import { ActionCreateNote } from '../../actions/notes/actionCreateNote';

export interface ICreateNote {
    success: boolean;
}

const INITIAL_STATE: ICreateNote = {
    success: false
};

const reducerCreateNote = (state: ICreateNote = INITIAL_STATE, action: ActionCreateNote): ICreateNote => {
    switch (action.type) {
        case CREATE_NOTE_SUCCESS:
            return { ...state, success: true };
        case CREATE_NOTE_CLEAR:
            return { ...state, success: false };
        default:
            return { ...state };
    }
};

export default reducerCreateNote;
