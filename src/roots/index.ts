import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ActionGetNotes } from '../actions/notes/actionGetNotes';
import { ActionCreateNote } from '../actions/notes/actionCreateNote';
import { ActionDeleteNote } from '../actions/notes/actionDeleteNote';
import { ActionShowNote } from '../actions/notes/actionShowNote';
import { ActionEditNote } from '../actions/notes/actionEditNote';
import { ActionDeleteAllNotes } from '../actions/notes/actionDeleteAllNotes';

import { IGetNotes } from '../reducers/notes/reducerGetNotes';
import { ICreateNote } from '../reducers/notes/reducerCreateNote';
import { IDeleteNote } from '../reducers/notes/reducerDeleteNote';
import { IShowNote } from '../reducers/notes/reducerShowNote';
import { IEditNote } from '../reducers/notes/reducerEditNote';
import { IDeleteAllNotes } from '../reducers/notes/reducerDeleteAllNotes';

export type IRootState = {
    getNotes: IGetNotes;
    createNote: ICreateNote;
    deleteNote: IDeleteNote;
    showNote: IShowNote;
    editNote: IEditNote;
    deleteAllNotes: IDeleteAllNotes;
};

export type IRootAction =
    ActionGetNotes |
    ActionCreateNote |
    ActionDeleteNote |
    ActionShowNote |
    ActionEditNote |
    ActionDeleteAllNotes;

export type RTDispatch = ThunkDispatch<IRootState, undefined, IRootAction>;
export type RTAction<R> = ThunkAction<R, IRootState, undefined, IRootAction>;