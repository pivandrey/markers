import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';

const propTypes = {
  tags: PropTypes.array.isRequired,
  addMarker: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
};

const CreateMarker = props => {
  const { addMarker, tags, createTag } = props;
  const [isShowCreator, handleShowCreator] = useState(false);

// валидация на непустую строку, превращение строки в массив,
// проверка каждого элемента на уникальность,
// в случае уникальности создание в редюсере нового тега

  const handleSubmitMarker = values => {
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
        if (equalTags.length === 0) {
          newTags.push(createTag(newTag));
        }
      }
    });
    addMarker({ ...values, tags: newTags });
    handleShowCreator(false);
  };

  const validateValues = values => {
    const errors = {};
    if (!values.hasOwnProperty('uri')) {
      errors.uri = 'Enter URL';
    }
    if (!values.hasOwnProperty('title')) {
      errors.title = 'Enter title';
    }
    return errors;
  };

  return (
    <div className="create-marker">
      {isShowCreator && (
        <div className="create-marker__creator">
          <Form
            onSubmit={handleSubmitMarker}
            validate={validateValues}
            render={({ handleSubmit, form }) => (
              <form
                className="content_edit__form"
                onSubmit={async event => {
                  const error = await handleSubmit(event);
                  if (error) {
                    return error;
                  }
                  form.reset();
                }}
              >
                <div className="form__uri">
                  <Field
                    name="uri"
                    component="input"
                    type="text"
                    placeholder="URL"
                  />
                </div>
                <div className="form__title">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Title"
                  />
                </div>
                <div className="content_tags">
                  <Field
                    name="tags"
                    component="input"
                    type="text"
                    placeholder="tags"
                  />
                </div>
                <button type="submit" className="form__save">
                  Save
                </button>
              </form>
            )}
          />
        </div>
      )}
      <div className="create-marker__switcher">
        <button
          className="switcher__button"
          type="button"
          onClick={() => handleShowCreator(!isShowCreator)}
        >
          <span className="button__text">Create Marker</span>
        </button>
      </div>
    </div>
  );
};

CreateMarker.propTypes = propTypes;

export default CreateMarker;
