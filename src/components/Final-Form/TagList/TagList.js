import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tag from '../../Tag';

const propTypes = {
  input: PropTypes.object.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      id: PropTypes.PropTypes.number.isRequired,
    })
  ),
};

const TagList = props => {
  const {
    tags,
    input: { value: listActive },
  } = props;

  const handleClickTag = tagId => {
    const {
      input: { value: listActive, onChange },
    } = this.props;

    let newListActive;

    if (listActive.includes(tagId)) {
      newListActive = listActive.filter(label => label !== tagId);
    } else {
      newListActive = [...listActive, tagId];
    }
    onChange(newListActive);
  };

  return (
    <div className="tag-list">
      <div className="tags-list__content">
        {tags.map(tag => (
          <Tag
            key={tag.id}
            isActive={listActive.includes(tag.id)}
            onClick={() => handleClickTag(tag.id)}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

TagList.propTypes = propTypes;

const mapStateToProps = state => ({
  tags: state.tags.tags,
});

export default connect(mapStateToProps)(TagList);
