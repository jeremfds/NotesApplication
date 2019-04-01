import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ActionGetNotes } from '../actions/notes/actionGetNotes';
import { ActionCreateNote } from '../actions/notes/actionCreateNote';
import { ActionDeleteNote } from '../actions/notes/actionDeleteNote';
import { ActionShowNote } from '../actions/notes/actionShowNote';

import { IGetNotes } from '../reducers/notes/reducerGetNotes';
import { ICreateNote } from '../reducers/notes/reducerCreateNote';
import { IDeleteNote } from '../reducers/notes/reducerDeleteNote';
import { IShowNote } from '../reducers/notes/reducerShowNote';

export type IRootState = {
    getNotes: IGetNotes;
    createNote: ICreateNote;
    deleteNote: IDeleteNote;
    showNote: IShowNote;
};

export type IRootAction = ActionGetNotes | ActionCreateNote | ActionDeleteNote | ActionShowNote;

export type RTDispatch = ThunkDispatch<IRootState, undefined, IRootAction>;
export type RTAction<R> = ThunkAction<R, IRootState, undefined, IRootAction>;