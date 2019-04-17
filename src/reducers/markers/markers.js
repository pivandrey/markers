import { handleActions } from 'redux-actions';
import * as TYPES from './types';

const initialState = {
  markers: [],
};

export default handleActions(
  {
    [TYPES.ADD_MARKER]: (state, action) => ({
      markers: state.markers.concat(action.payload),
    }),
    [TYPES.DELETE_MARKER]: (state, action) => ({
      markers: state.markers.filter(marker => marker.id !== action.payload),
    }),
    [TYPES.EDIT_MARKER]: (state, action) => ({
      markers: state.markers.map(marker => {
        if (marker.id !== action.payload.id) {
          return marker;
        } else {
          return { ...marker, ...action.payload };
        }
      }),
    }),
  },
  initialState
);
