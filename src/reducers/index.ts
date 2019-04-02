import { combineReducers, Reducer } from 'redux';
import { IRootState, IRootAction } from '../roots';

import reducerGetNotes from './notes/reducerGetNotes';
import reducerCreateNote from './notes/reducerCreateNote';
import reducerDeleteNote from './notes/reducerDeleteNote';
import reducerShowNote from './notes/reducerShowNote';
import reducerEditNote from './notes/reducerEditNote';

const reducers: Reducer<IRootState, IRootAction> = combineReducers<IRootState, IRootAction>({
    getNotes: reducerGetNotes,
    createNote: reducerCreateNote,
    deleteNote: reducerDeleteNote,
    showNote: reducerShowNote,
    editNote: reducerEditNote
});

export default reducers;