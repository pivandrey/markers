import { createAction } from 'redux-actions';
import * as TYPES from './types';

export const addTag = createAction(TYPES.ADD_TAG);

export const createTag = text => dispatch => {
  const id = Math.random()
    .toString(36)
    .substr(2, 9);
  const color = randomHexColor();
  dispatch(addTag({ id, text, color }));
  return id;
};

const randomHexColor = () => {
  let count = 6;
  let s = '#';
  while (count--) {
    s += ((Math.random() * 16) | 0).toString(16);
  }
  return s;
};
