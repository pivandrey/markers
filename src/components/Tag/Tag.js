import React, { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  onClickTag: PropTypes.func.isRequired,
};

const Tag = props => {
  const {
    tag: { id, text },
    onClickTag,
  } = props;

  const handleChooseTag = () => {
    onClickTag(id);
  };

  return (
    <div className="tag" onClick={handleChooseTag}>
      <span className="tag__text">{text}</span>
    </div>
  );
};

Tag.propTypes = propTypes;

export default Tag;
