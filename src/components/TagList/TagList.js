import React from 'react';
import PropTypes from 'prop-types';

import Tag from '../Tag';

const propTypes = {
  tags: PropTypes.array.isRequired,
};

const TagList = props => {
  const { tags } = props;

  return (
    <div className="tag-list">
      <div className="tags-list__content">
        {tags.map(tag => (
          <Tag key={tag} tagId={tag} />
        ))}
      </div>
    </div>
  );
};

TagList.propTypes = propTypes;

export default TagList;
