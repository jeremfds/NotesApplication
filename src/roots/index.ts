import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ActionGetNotes } from '../actions/notes/actionGetNotes';
import { ActionCreateNote } from '../actions/notes/actionCreateNote';
import { ActionDeleteNote } from '../actions/notes/actionDeleteNote';

import { IGetNotes } from '../reducers/notes/reducerGetNotes';
import { ICreateNote } from '../reducers/notes/reducerCreateNote';
import { IDeleteNote } from '../reducers/notes/reducerDeleteNote';

export type IRootState = {
    getNotes: IGetNotes;
    createNote: ICreateNote;
    deleteNote: IDeleteNote;
};

export type IRootAction = ActionGetNotes | ActionCreateNote | ActionDeleteNote;

export type RTDispatch = ThunkDispatch<IRootState, undefined, IRootAction>;
export type RTAction<R> = ThunkAction<R, IRootState, undefined, IRootAction>;