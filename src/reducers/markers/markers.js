import { handleActions } from 'redux-actions';
import * as TYPES from './types';

const initialState = {
  markers: [],
  foundMarkersByTitle: [],
  foundMarkersByTags: [],
};

export default handleActions(
  {
    [TYPES.ADD_MARKER]: (state, action) => ({
      ...state,
      markers: state.markers.concat(action.payload),
    }),
    [TYPES.DELETE_MARKER]: (state, action) => ({
      ...state,
      markers: state.markers.filter(marker => marker.id !== action.payload),
    }),
    [TYPES.EDIT_MARKER]: (state, action) => ({
      ...state,
      markers: state.markers.map(marker => {
        if (marker.id !== action.payload.id) {
          return marker;
        } else {
          return { ...marker, ...action.payload };
        }
      }),
    }),
    [TYPES.SET_FOUND_MARKERS]: (state, action) => ({
      ...state,
      foundMarkersByTitle: action.payload.foundMarkersByTitle,
      foundMarkersByTags: action.payload.foundMarkersByTags,
    }),
  },
  initialState
);
