import { handleActions } from 'redux-actions';
import * as TYPES from './types';

const initialState = {
  tags: [],
};

export default handleActions(
  {
    [TYPES.ADD_TAG]: (state, action) => ({
      tags: state.tags.concat(action.payload),
    }),
  },
  initialState
);
