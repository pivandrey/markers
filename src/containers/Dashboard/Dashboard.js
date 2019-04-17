import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addMarker } from '../../reducers/markers/actions';
import Marker from '../Marker';
import MarkerList from '../../components/MarkerList';
import CreateMarker from '../../components/CreateMarker';

const propTypes = {
  markers: PropTypes.array.isRequired,
  addMarker: PropTypes.func.isRequired,
};

const Dashboard = props => {
  const { addMarker, markers } = props;

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <MarkerList
          markers={markers}
          renderMarker={marker => <Marker markerId={marker.id} />}
        />
        <CreateMarker addMarker={values => addMarker(values)} />
      </div>
    </div>
  );
};

Dashboard.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  markers: state.markers.markers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMarker,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
