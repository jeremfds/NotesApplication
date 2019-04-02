import { DELETE_ALL_NOTES_SUCCESS, DELETE_ALL_NOTES_FAILURE, DELETE_ALL_NOTES_CLEAR } from '../../actions/actionTypes';
import { ActionDeleteAllNotes } from '../../actions/notes/actionDeleteAllNotes';

export interface IDeleteAllNotes {
    success: boolean;
}

const INITIAL_STATE: IDeleteAllNotes = {
    success: false
};

const reducerDeleteAllNotes = (state: IDeleteAllNotes = INITIAL_STATE, action: ActionDeleteAllNotes): IDeleteAllNotes => {
    switch (action.type) {
        case DELETE_ALL_NOTES_SUCCESS:
            return { ...state, success: true };
        case DELETE_ALL_NOTES_FAILURE:
            return { ...state, success: false };
        case DELETE_ALL_NOTES_CLEAR:
            return { ...state, success: false };
        default:
            return { ...state };
    }
};

export default reducerDeleteAllNotes;
