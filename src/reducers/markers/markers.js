import { handleActions } from 'redux-actions';
import * as TYPES from './types';

const initialState = {
  markers: [],
  foundMarkersByTitle: [],
  foundMarkersByTags: [],
  foundTitle: '',
  foundTags: '',
};

export default handleActions(
  {
    [TYPES.ADD_MARKER]: (state, action) => ({
      ...state,
      markers: state.markers.concat(action.payload),
      foundTitle: '',
      foundTags: '',
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
    [TYPES.CLEAR_FOUND_MARKERS]: (state, action) => ({
      ...state,
      foundMarkersByTitle: [],
      foundMarkersByTags: [],
    }),
    [TYPES.SET_TITLE]: (state, action) => ({
      ...state,
      foundTitle: action.payload,
    }),
    [TYPES.SET_TAGS]: (state, action) => ({
      ...state,
      foundTags: action.payload,
    }),
    [TYPES.RESET_AUTO_FILL]: (state, action) => ({
      ...state,
      foundTitle: '',
      foundTags: '',
    }),
  },
  initialState
);
