import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  onClickTag: PropTypes.func.isRequired,
};

class Tag extends Component {
  handleChooseTag = () => {
    const {
      tag: { id },
    } = this.props;
    this.props.onClickTag(id);
  };

  render() {
    const {
      tag: { text },
    } = this.props;
    return (
      <div className="tag" onClick={this.handleChooseTag}>
        <span className="tag__text">{text}</span>
      </div>
    );
  }
}

Tag.propTypes = propTypes;

export default Tag;
