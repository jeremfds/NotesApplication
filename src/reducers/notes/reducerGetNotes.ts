import { GET_NOTES_ARRAY, GET_NOTES_EMPTY, GET_NOTES_FAILURE, GET_NOTES_CLEAR } from '../../actions/ActionTypes';
import { ActionGetNotes } from '../../actions/notes/actionGetNotes';
import { MNote } from '../../models/notes';

export interface IGetNotes {
    notes: MNote[];
    success: boolean;
}

const INITIAL_STATE: IGetNotes = {
    notes: [],
    success: false
};

const reducerGetNotes = (state: IGetNotes = INITIAL_STATE, action: ActionGetNotes): IGetNotes => {
    switch (action.type) {
        case GET_NOTES_ARRAY:
            // @ts-ignore
            return { ...state, notes: action.notes, success: true };
        case GET_NOTES_EMPTY:
            return { ...state, notes: [], success: true };
        case GET_NOTES_FAILURE:
            return { ...state, notes: [], success: false };
        case GET_NOTES_CLEAR:
            return { ...state, notes: [], success: false };
        default:
            return { ...state };
    }
};

export default reducerGetNotes;
