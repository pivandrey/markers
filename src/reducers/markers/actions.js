import { createAction } from 'redux-actions';
import * as TYPES from './types';

export const addMarker = createAction(TYPES.ADD_MARKER);
export const deleteMarker = createAction(TYPES.DELETE_MARKER);
export const editMarker = createAction(TYPES.EDIT_MARKER);
