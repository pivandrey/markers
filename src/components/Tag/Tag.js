import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  isActive: PropTypes.boolean.isRequired,
  onClickTag: PropTypes.func.isRequired,
};

const defaultProps = {
  isActive: false,
};

const Tag = props => {
  const { text, isActive, onClickTag } = props;

  return (
    <button
      type="button"
      className={isActive ? 'tag_active' : 'tag'}
      onClick={onClickTag}
    >
      <span className="tag__text">{text}</span>
    </button>
  );
};

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;
