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
    addMarker({ ...values, tags: newTags });
  };

  return (
    <div className="create-marker">
      {isShowCreator && (
        <div className="create-marker__creator">
          <Form
            onSubmit={handleSubmit}
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
                    placeholder="tags"
                  />
                </div>
                <button onClick={handleSubmit} className="form__save">
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
