import { createAction } from 'redux-actions';
import * as TYPES from './types';

import { getMarkers, getTags } from '../../selectors';

export const addMarker = createAction(TYPES.ADD_MARKER);
export const deleteMarker = createAction(TYPES.DELETE_MARKER);
export const editMarker = createAction(TYPES.EDIT_MARKER);
export const setFoundMarkers = createAction(TYPES.SET_FOUND_MARKERS);
export const clearFoundMarkers = createAction(TYPES.CLEAR_FOUND_MARKERS);

export const createMarker = values => dispatch => {
  const id = Math.random()
    .toString(36)
    .substr(2, 9);
  const date = new Date();
  const parseDate = date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  dispatch(addMarker({ id, date: parseDate, ...values }));
};

// поиск выполняется в одном редюсере,
// так как нужно найти именно закладки по тайтлу/тегу, а не тайтл или тег
// после чего передаем в редюсер двумя массивами (по тайтлам, по тегам)
export const searchMarkers = query => (dispatch, getState) => {
  const state = getState();
  const markers = getMarkers(state);
  const tags = getTags(state);
  const foundMarkersByTitle = markers.filter(marker =>
    marker.title.includes(query)
  );
  const filterTags = tags
    .filter(tag => tag.text.includes(query))
    .map(t => t.id);
  const foundMarkersByTags = markers.filter(marker => {
    const equalTag = marker.tags.filter(tag => filterTags.includes(tag));
    if (equalTag.length > 0) {
      return marker;
    }
  });
  dispatch(setFoundMarkers({ foundMarkersByTitle, foundMarkersByTags }));
};
