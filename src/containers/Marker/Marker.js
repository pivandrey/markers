import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { bindActionCreators } from 'redux';

import { getMarker } from '../../selectors';
import { editMarker, deleteMarker } from '../../reducers/markers/actions';
import { addTag } from '../../reducers/tags/actions';
import TagList from '../../components/Final-Form/TagList';
import CreateTag from '../../components/CreateTag';

const propTypes = {
  markerId: PropTypes.number.isRequired,
  initialFormValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    uri: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }),
  editMarker: PropTypes.func.isRequired,
  deleteMarker: PropTypes.func.isRequired,
};

const Marker = props => {
  const {
    markerId,
    initialFormValues,
    editMarker,
    deleteMarker,
    addTag,
  } = props;
  const { title, uri, atCreated } = props.initialFormValues;

  const [editMode, changeEditMode] = useState(false);

  const handleSubmit = values => {
    editMarker(values);
  };

  const handleClickTag = value => {
    addTag(value);
  };

  return (
    <div className="marker">
      {editMode ? (
        <div className="marker__content_edit">
          <Form
            onSubmit={handleSubmit}
            initialValues={initialFormValues}
            validate={this.validate}
            render={({ handleSubmit }) => (
              <form className="content_edit__form">
                <div className="form__title">
                  <Field name="title" component="input" type="text" />
                </div>
                <div className="form__uri">
                  <Field name="uri" component="input" type="text" />
                </div>
                <div className="content_tags">
                  <Field name="tags" component={TagList} editMode={editMode} />
                </div>
                <button onClick={handleSubmit} className="form__save">
                  Save
                </button>
              </form>
            )}
          />
          <CreateTag onClickAddTag={handleClickTag} />
        </div>
      ) : (
        <div className="marker__content">
          <span className="content__title">{title}</span>
          <span className="content__uri">{uri}</span>
          <span className="content__date">{atCreated}</span>
          <div className="content_tags">
            <TagList editMode={editMode} />
          </div>
        </div>
      )}
      <button
        className="marker__edit-mode-button"
        type="button"
        onClick={() => changeEditMode(true)}
      >
        <span className="edit-mode-button__text">Edit</span>
      </button>
      <button
        className="marker__delete-button"
        type="button"
        onClick={() => deleteMarker(markerId)}
      >
        <span className="delete-button__text">x</span>
      </button>
    </div>
  );
};

Marker.propTypes = propTypes;

const makeMapStateToProps = () => {
  const getMarkerById = getMarker();

  const mapStateToProps = (state, props) => {
    const initialFormValues = getMarkerById(state, props);
    return {
      initialFormValues,
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editMarker,
      deleteMarker,
      addTag,
    },
    dispatch
  );

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Marker);
