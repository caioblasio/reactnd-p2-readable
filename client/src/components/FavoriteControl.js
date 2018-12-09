import React, { Component, Fragment } from 'react';
import { checkValue, saveValue } from '../utils/locaStorage';
import IconButton from '@material-ui/core/IconButton';
import Star from '@material-ui/icons/Star';
import PropTypes from 'prop-types';

/**
 * @description Favorite Control component for a post
 * @param {string} id
*/
class FavoriteControl extends Component {

  static propType = {
    id: PropTypes.string.isRequired
  };

  state = {
    currentFavorite: checkValue('favorites', this.props.id)
  }

  /**
   * @description Toggle favorite status of a post
  */
  toggleFavorite = () => {
    const { currentFavorite } = this.state;
    const newFavorite = !currentFavorite;
    saveValue('favorites', this.props.id, newFavorite)
    this.setState({ currentFavorite: newFavorite })
  }

  render() {
    const { currentFavorite } = this.state;

    return (
      <Fragment>
        <IconButton
          aria-label="Like"
          onClick={this.toggleFavorite}
          color={currentFavorite === true ? 'primary' : 'default'}
        >
          <Star />
        </IconButton>
      </Fragment>
    )
  }
}

export default FavoriteControl;