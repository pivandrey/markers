import { createAction } from 'redux-actions';
import * as TYPES from './types';

import { getMarkers, getTags } from '../../selectors';

export const addMarker = createAction(TYPES.ADD_MARKER);
export const deleteMarker = createAction(TYPES.DELETE_MARKER);
export const editMarker = createAction(TYPES.EDIT_MARKER);
export const setFoundMarkers = createAction(TYPES.SET_FOUND_MARKERS);
export const clearFoundMarkers = createAction(TYPES.CLEAR_FOUND_MARKERS);
export const setTitle = createAction(TYPES.SET_TITLE);
export const setTags = createAction(TYPES.SET_TAGS);
export const resetAutoFill = createAction(TYPES.RESET_AUTO_FILL);

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

export const getTitle = url => async dispatch => {
  const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  const { titleText, descriptionText } = await fetch(proxyurl + url)
    .then(response => response.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const title = doc.querySelectorAll('title')[0];
      const titleText = title.innerText;
      const description = doc.querySelectorAll('meta');
      let descriptionText = '';
      for (let i = 0; i < description.length; i++) {
        if (description[i].getAttribute('name') === 'description') {
          descriptionText = description[i].getAttribute('content');
        }
      }
      return { titleText, descriptionText };
    });
  dispatch(setTitle(titleText));
  const parseDescription = descriptionText.split(/\s/).join(';');
  dispatch(setTags(parseDescription));
};
