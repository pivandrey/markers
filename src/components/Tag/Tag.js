import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTag } from '../../selectors';

const propTypes = {
  tagId: PropTypes.number,
};

const Tag = props => {
  const { tag } = props;

  return (
    <div className="tag" style={{ backgroundColor: tag.color }}>
      <span className="tag__text">{tag.text}</span>
    </div>
  );
};

Tag.propTypes = propTypes;

const makeMapStateToProps = () => {
  const getTagById = getTag();

  const mapStateToProps = (state, props) => {
    const tag = getTagById(state, props);
    return {
      tag,
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(Tag);
