import { combineReducers, Reducer } from 'redux';
import { IRootState, IRootAction } from '../roots';

import reducerGetNotes from './notes/reducerGetNotes';
import reducerCreateNote from './notes/reducerCreateNote';

const reducers: Reducer<IRootState, IRootAction> = combineReducers<IRootState, IRootAction>({
    getNotes: reducerGetNotes,
    createNote: reducerCreateNote
});

export default reducers;