import { createSelector } from 'reselect';

export const getMarkers = state => state.markers.markers;
export const getMarkerIdFromProps = (state, props) => props.markerId;
export const getMarker = () =>
  createSelector(
    [getMarkers, getMarkerIdFromProps],
    (markers, markerId) => markers.filter(marker => marker.id === markerId)[0]
  );

export const getTags = state => state.tags.tags;
export const getTagIdFromProps = (state, props) => props.tagId;
export const getTag = () =>
  createSelector(
    [getTags, getTagIdFromProps],
    (tags, tagId) => tags.filter(tag => tag.id === tagId)[0]
  );
export const getTextTagForMarker = () =>
  createSelector(
    [getTags, getMarkers, getMarkerIdFromProps],
    (tags, markers, markerId) =>
      markers
        .filter(marker => marker.id === markerId)[0]
        .tags.map(markerTag => {
          return tags.filter(tag => tag.id === markerTag)[0].text;
        })
  );
