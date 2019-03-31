import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ActionGetNotes } from '../actions/notes/actionGetNotes';
import { ActionCreateNote } from '../actions/notes/actionCreateNote';

import { IGetNotes } from '../reducers/notes/reducerGetNotes';
import { ICreateNote } from '../reducers/notes/reducerCreateNote';

export type IRootState = {
    getNotes: IGetNotes;
    createNote: ICreateNote;
};

export type IRootAction = ActionGetNotes | ActionCreateNote;

export type RTDispatch = ThunkDispatch<IRootState, undefined, IRootAction>;
export type RTAction<R> = ThunkAction<R, IRootState, undefined, IRootAction>;