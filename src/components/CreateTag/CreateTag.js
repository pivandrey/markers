import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const propTypes = {
  onClickAddTag: PropTypes.func.isRequired,
};

const CreateTag = props => {
  const { onClickAddTag } = props;
  const [value, changeValue] = useState('');

  return (
    <div className="create-tag">
      <input
        className="create-tag__field"
        type="text"
        placeholder="Create own tag"
        onBlur={changeValue}
      />
      <button
        className="create-tag__button"
        type="button"
        onClick={() => onClickAddTag(value)}
      >
        <span className="button__text">Create Tag</span>
      </button>
    </div>
  );
};

CreateTag.propTypes = propTypes;

export default CreateTag;
