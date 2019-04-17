import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { bindActionCreators } from 'redux';

import { getMarker, getTagsById } from '../../selectors';
import { editMarker, deleteMarker } from '../../reducers/markers/actions';
import { createTag } from '../../reducers/tags/actions';
import { addTag } from '../../reducers/tags/actions';
import TagList from '../../components/TagList';
import AddTag from '../../components/Final-Form/AddTag';

const propTypes = {
  markerId: PropTypes.string.isRequired,
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
  createTag: PropTypes.func.isRequired,
};

const Marker = props => {
  const { markerId, marker, editMarker, deleteMarker, createTag } = props;
  // const { title, uri, atCreated } = props.initialFormValues;

  const { title, uri, atCreated, tags } = props.marker;
  console.log(marker);

  const [editMode, changeEditMode] = useState(false);

  const handleSubmit = values => {
    let newTags = [];
    const parseTags = values.tags ? values.tags.split(';') : [];
    parseTags.map(newTag => {
      if (tags.length === 0) {
        newTags.push(createTag(newTag));
      } else {
        const equalTags = tags.filter((oldTag, index) => {
          if (oldTag.text === newTag) {
            newTags.push(tags[index].id);
            return oldTag.id;
          }
        });
        if (!equalTags) {
          newTags.push(createTag(newTag));
        }
      }
    });
    editMarker({ ...values, tags: newTags });
    changeEditMode(false);
  };

  return (
    <div className="marker">
      {editMode ? (
        <div className="marker__content_edit">
          <Form
            onSubmit={handleSubmit}
            // initialValues={initialFormValues}
            render={({ handleSubmit }) => (
              <form className="content_edit__form">
                <div className="form__title">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Title"
                  />
                </div>
                <div className="form__uri">
                  <Field
                    name="uri"
                    component="input"
                    type="text"
                    placeholder="URL"
                  />
                </div>
                <div className="content_tags">
                  <Field
                    name="tags"
                    component="input"
                    type="text"
                    placeholder="Tags"
                  />
                </div>
                <button onClick={handleSubmit} className="form__save">
                  Save
                </button>
              </form>
            )}
          />
        </div>
      ) : (
        <div className="marker__content">
          <span className="content__title">{title}</span>
          <span className="content__uri">{uri}</span>
          <span className="content__date">{atCreated}</span>
          <div className="content_tags">
            <TagList tags={tags} />
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
      createTag,
    },
    dispatch
  );

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Marker);
