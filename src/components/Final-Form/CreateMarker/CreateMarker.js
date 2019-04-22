import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

const propTypes = {
  tags: PropTypes.array.isRequired,
  foundTitle: PropTypes.string,
  foundTags: PropTypes.string,
  addMarker: PropTypes.func.isRequired,
  createTag: PropTypes.func.isRequired,
  getTitle: PropTypes.func.isRequired,
  resetAutoFill: PropTypes.func.isRequired,
};

const CreateMarker = props => {
  const {
    addMarker,
    tags,
    createTag,
    getTitle,
    foundTitle,
    foundTags,
    resetAutoFill,
  } = props;
  const [isShowCreator, handleShowCreator] = useState(false);
  const [uri, onBlurUri] = useState('');
  const [isValid, validateUri] = useState(false);

  useEffect(() => {
    resetAutoFill();
  }, []);

  // валидация на непустую строку, превращение строки в массив,
  // проверка каждого элемента на уникальность,
  // в случае уникальности создание в редюсере нового тега

  const handleSubmitMarker = values => {
    let newTags = [];
    const parseTags = values.tags ? values.tags.toLowerCase().split(';') : [];
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
    onBlurUri('');
  };

  const validateValues = values => {
    const errors = {};
    if (!values.hasOwnProperty('uri') || !values.uri) {
      errors.uri = 'Enter URL';
      validateUri(false);
    } else if (
      values.uri &&
      !values.uri.match(/^(ftp|http|https):\/\/[^ "]+$/)
    ) {
      errors.uri = 'Enter URL';
      validateUri(false);
    } else {
      validateUri(true);
    }
    if (!values.hasOwnProperty('title') || !values.title) {
      errors.title = 'Enter title';
    }
    return errors;
  };

  const handleBlurUrl = async e => {
    const url = e.currentTarget.value;
    isValid && onBlurUri(url);
    isValid && url && (await getTitle(url));
  };

  return (
    <div className="create-marker">
      <div className="create-marker__switcher">
        <button
          className="switcher__button"
          type="button"
          onClick={() => handleShowCreator(!isShowCreator)}
        >
          <span className="button__text">
            {isShowCreator ? 'Cancel' : 'Create Marker'}
          </span>
        </button>
      </div>
      {isShowCreator && (
        <div className="create-marker__creator">
          <Form
            onSubmit={handleSubmitMarker}
            initialValues={{
              title: foundTitle ? foundTitle : '',
              uri: uri,
              tags: foundTags ? foundTags : '',
            }}
            validate={validateValues}
            render={({ handleSubmit, form, submitError }) => (
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
                    className="form__input"
                    onBlur={handleBlurUrl}
                  />
                  {submitError && <div className="error">{submitError}</div>}
                </div>
                <div className="form__title">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Title"
                    className="form__input"
                  />
                </div>
                <div className="content_tags">
                  <Field
                    name="tags"
                    component="input"
                    type="text"
                    placeholder="tags"
                    className="form__input"
                  />
                </div>
                <button type="submit" className="form__save">
                  Create
                </button>
              </form>
            )}
          />
        </div>
      )}
    </div>
  );
};

CreateMarker.propTypes = propTypes;

export default CreateMarker;
