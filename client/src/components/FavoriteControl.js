import React, { Component, Fragment } from 'react';

import IconButton from '@material-ui/core/IconButton';

import Star from '@material-ui/icons/Star';

import { checkValue, saveValue } from '../utils/locaStorage';

class FavoriteControl extends Component {

  state = {
    currentFavorite: checkValue('favorites', this.props.id)
  }

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