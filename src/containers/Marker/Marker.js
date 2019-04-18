import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { bindActionCreators } from 'redux';

import { getMarker, getTextTagForMarker, getTags } from '../../selectors';
import { editMarker, deleteMarker } from '../../reducers/markers/actions';
import { createTag } from '../../reducers/tags/actions';
import { addTag } from '../../reducers/tags/actions';
import TagList from '../../components/TagList';

const propTypes = {
  markerId: PropTypes.string.isRequired,
  textTags: PropTypes.array.isRequired,
  initialFormValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
  }),
  editMarker: PropTypes.func.isRequired,
  deleteMarker: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
};

const Marker = props => {
  const {
    markerId,
    editMarker,
    deleteMarker,
    createTag,
    initialFormValues,
    textTags,
    allTags,
  } = props;
  const { title, uri, date, tags } = props.initialFormValues;

  const [editMode, changeEditMode] = useState(false);

  const handleClickLink = () => {
    window.open(uri, '_blank');
  };

  // аналогично сабмиту в CreateMarker

  const handleSubmitMarker = values => {
    let newTags = [];
    const parseTags = values.tags ? values.tags.split(';') : [];
    parseTags.map(newTag => {
      if (allTags.length === 0) {
        newTags.push(createTag(newTag));
      } else {
        const equalTags = allTags.filter((oldTag, index) => {
          if (oldTag.text === newTag) {
            newTags.push(allTags[index].id);
            return oldTag.id;
          }
        });
        if (equalTags.length === 0) {
          newTags.push(createTag(newTag));
        }
      }
    });
    editMarker({ ...values, tags: newTags });
    changeEditMode(false);
  };

  const validateValues = values => {
    const errors = {};
    if (!values.hasOwnProperty('uri')) {
      errors.uri = 'Enter URL';
    }
    if (!values.hasOwnProperty('title')) {
      errors.title = 'Enter title';
    }
  };

  return (
    <div className="marker">
      {editMode ? (
        <div className="marker__content_edit">
          <Form
            onSubmit={handleSubmitMarker}
            validate={validateValues}
            // так как теги в закладке хранятся в виде массива ID,
            // в селекторе getTextTag преобразовываем ID в текст и
            // превращаем массив в строку с разделителем ";"
            initialValues={{
              ...initialFormValues,
              tags: textTags.join(';'),
            }}
            render={({ handleSubmit }) => (
              <form className="content_edit__form" onSubmit={handleSubmit}>
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
                <button type="submit" className="form__save">
                  Save
                </button>
              </form>
            )}
          />
        </div>
      ) : (
        <div className="marker__content" onClick={handleClickLink}>
          <span className="content__title">{title}</span>
          <span className="content__uri">{uri}</span>
          <div className="content_tags">
            <TagList tags={tags} />
          </div>
          <span className="content__date">{date}</span>
        </div>
      )}
      <button
        className="marker__edit-mode-button"
        type="button"
        onClick={() => changeEditMode(!editMode)}
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

// передаем в селектор ID и получаем закладку,
// аналогично с текстами тегов для этой закладки
const makeMapStateToProps = () => {
  const getMarkerById = getMarker();
  const getTextTag = getTextTagForMarker();

  const mapStateToProps = (state, props) => {
    const initialFormValues = getMarkerById(state, props);
    const textTags = getTextTag(state, props);
    const allTags = getTags(state);
    return {
      initialFormValues,
      textTags,
      allTags,
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
