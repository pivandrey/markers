import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFoundMarkersByTitle, getFoundMarkersByTags } from '../../selectors';
import {
  createMarker,
  searchMarkers,
  clearFoundMarkers,
} from '../../reducers/markers/actions';
import { createTag } from '../../reducers/tags/actions';
import Marker from '../Marker';
import MarkerList from '../../components/MarkerList';
import CreateMarker from '../../components/Final-Form/CreateMarker';

const propTypes = {
  markers: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  createMarker: PropTypes.func.isRequired,
  searchMarkers: PropTypes.func.isRequired,
  clearFoundMarkers: PropTypes.func.isRequired,
};

const Dashboard = props => {
  const {
    createMarker,
    markers,
    tags,
    createTag,
    searchMarkers,
    foundMarkersByTitle,
    foundMarkersByTags,
    clearFoundMarkers,
  } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, changeSearchMode] = useState(false);

  const handleChange = e => {
    const value = e.currentTarget.value;
    setSearchQuery(value);
  };

  const handleClickSearch = () => {
    if (searchQuery) {
      searchMarkers(searchQuery);
      changeSearchMode(true);
    } else {
      clearFoundMarkers();
      changeSearchMode(false);
    }
  };

  // логика отображения закладок:
  // без активации поиска показываем все идеи

  // после ввода запроса выводятся найденные закладки,
  // отсортированные по тайтлам, и по тегам

  // если ничего не найдено, увидем текст

  // вернуться к all-markers можно после ввода пустого запроса
  return (
    <div className="dashboard">
      <div className="dashboard__search">
        <input
          type="text"
          className="search__input"
          placeholder="Search..."
          onChange={handleChange}
        />
        <button
          type="button"
          className="search__button"
          onClick={handleClickSearch}
        >
          <span className="button__text">Search</span>
        </button>
      </div>
      <div className="dashboard__content">
        <CreateMarker
          addMarker={values => createMarker(values)}
          tags={tags}
          createTag={value => createTag(value)}
        />
        {!searchMode && (
          <MarkerList
            markers={markers}
            renderMarker={marker => <Marker markerId={marker.id} />}
          />
        )}
        {foundMarkersByTitle.length > 0 && (
          <div>
            <span className="content__search-title">Found by Title</span>
            <MarkerList
              markers={foundMarkersByTitle}
              renderMarker={marker => <Marker markerId={marker.id} />}
            />
          </div>
        )}
        {foundMarkersByTags.length > 0 && (
          <div>
            <span className="content__search-title">Found by Tags</span>
            <MarkerList
              markers={foundMarkersByTags}
              renderMarker={marker => <Marker markerId={marker.id} />}
            />
          </div>
        )}
        {searchMode &&
          foundMarkersByTitle.length === 0 &&
          foundMarkersByTags.length === 0 && (
            <span className="content__search-empty">Not found</span>
          )}
      </div>
    </div>
  );
};

Dashboard.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  markers: state.markers.markers,
  tags: state.tags.tags,
  foundMarkersByTitle: getFoundMarkersByTitle(state),
  foundMarkersByTags: getFoundMarkersByTags(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createMarker,
      createTag,
      searchMarkers,
      clearFoundMarkers,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
