import { GET_NOTES_ARRAY, GET_NOTES_EMPTY, GET_NOTES_FAILURE, GET_NOTES_CLEAR } from '../../actions/actionTypes';
import { ActionGetNotes } from '../../actions/notes/actionGetNotes';
import { MNote } from '../../models/notes';

export interface IGetNotes {
    notes: MNote[];
    success: boolean;
    notCompatible: boolean;
}

const INITIAL_STATE: IGetNotes = {
    notes: [],
    success: false,
    notCompatible: false
};

const reducerGetNotes = (state: IGetNotes = INITIAL_STATE, action: ActionGetNotes): IGetNotes => {
    switch (action.type) {
        case GET_NOTES_ARRAY:
            return {...state, notes: action.notes, success: true, notCompatible: false};
        case GET_NOTES_EMPTY:
            return { ...state, notes: [], success: true, notCompatible: false };
        case GET_NOTES_FAILURE:
            return { ...state, notes: [], success: false, notCompatible: true };
        case GET_NOTES_CLEAR:
            return { ...state, notes: [], success: false, notCompatible: false };
        default:
            return { ...state };
    }
};

export default reducerGetNotes;
