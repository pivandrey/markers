import { createSelector } from 'reselect';

export const getMarkers = state => state.markers.markers;
export const getMarkerIdFromProps = (state, props) => props.markerId;
export const getMarker = () =>
  createSelector(
    [getMarkers, getMarkerIdFromProps],
    (markers, markerId) => markers[markerId]
  );
