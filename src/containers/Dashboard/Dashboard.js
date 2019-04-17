import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createMarker } from '../../reducers/markers/actions';
import { createTag } from '../../reducers/tags/actions';
import Marker from '../Marker';
import MarkerList from '../../components/MarkerList';
import CreateMarker from '../../components/Final-Form/CreateMarker';

const propTypes = {
  markers: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  createMarker: PropTypes.func.isRequired,
};

const Dashboard = props => {
  const { createMarker, markers, tags, createTag } = props;

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <MarkerList
          markers={markers}
          renderMarker={marker => (
            <Marker marker={marker} markerId={marker.id} />
          )}
        />
        <CreateMarker
          addMarker={values => createMarker(values)}
          tags={tags}
          createTag={value => createTag(value)}
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  markers: state.markers.markers,
  tags: state.tags.tags,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createMarker,
      createTag,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
