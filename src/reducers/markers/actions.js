import { createAction } from 'redux-actions';
import * as TYPES from './types';

export const addMarker = createAction(TYPES.ADD_MARKER);
export const deleteMarker = createAction(TYPES.DELETE_MARKER);
export const editMarker = createAction(TYPES.EDIT_MARKER);

export const createMarker = values => dispatch => {
  const id = Math.random()
    .toString(36)
    .substr(2, 9);
  dispatch(addMarker({ id, ...values }));
};
