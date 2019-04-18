import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  markers: PropTypes.array.isRequired,
  renderMarker: PropTypes.func.isRequired,
};

const MarkerList = props => {
  const { renderMarker, markers } = props;

  return (
    <div className="marker-list">
      {markers.map(marker => (
        <React.Fragment key={marker.id}>{renderMarker(marker)}</React.Fragment>
      ))}
    </div>
  );
};

MarkerList.propTypes = propTypes;

export default MarkerList;
