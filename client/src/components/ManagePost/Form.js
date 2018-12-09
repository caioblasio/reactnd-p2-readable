import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import uuidv1 from 'uuid/v1';
import { withRouter } from 'react-router-dom';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },

});

/**
 * @description Component for adding a component in a post detail page
 * @param {function()} onSubmit
 * @param {object[]} categories
 * @param {object} post
 * @param {object} classes
*/
class Form extends Component {

  static propType = {
    onSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    post: PropTypes.object,
    classes: PropTypes.object.isRequired
  };

  state = this.getInitialState(this.props.post);

  /**
   * @description Get initial state of the form component according to props that were passed
   * @param {object} post
  */
  getInitialState(post) {
    const state = post 
    ? {
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    } : {
      title: '',
      body: '',
      author: '',
      category: '',
    }
    return state
  }

  /**
   * @description Handles new receiving of props and updates the form as necessary
  */
  componentWillReceiveProps = ({ post }) => {
    this.setState(this.getInitialState(post))
  }

  /**
   * @description Handles change of text fields
   * @param {string} name
   * @param {object} event
  */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /**
   * @description Creates a new post object or use existing and handles form submit
   * @param {object} event
  */
  handleSubmit = (event) => {
    event.preventDefault();
    
    const { onSubmit, post } = this.props,
      { title, body, author, category } = this.state

    onSubmit({
      id: post ? post.id : uuidv1(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category,
    });

    this.setState({
      title: '',
      body: '',
      author: '',
      category: ''
    });

  }
 
  render() {
    const { title, body, author, category } = this.state, 
      { classes, variant, categories } = this.props;

    return (
      <ValidatorForm autoComplete="off" onSubmit={this.handleSubmit}>
        <TextValidator
          id="title"
          label="Title"
          multiline
          rows="1"
          fullWidth
          value={title}
          onChange={this.handleChange('title')}
          margin="normal"
          variant={variant}
          name="title"
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <TextValidator
          id="body"
          label="Body"
          multiline
          rows="8"
          fullWidth
          value={body}
          onChange={this.handleChange('body')}
          margin="normal"
          variant={variant}
          name="body"
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <TextValidator
          id="author"
          label="Author"
          multiline
          rows="1"
          fullWidth
          value={author}
          onChange={this.handleChange('author')}
          margin="normal"
          variant={variant}
          name="author"
          validators={['required']}
          errorMessages={['This field is required']}
        />
        <SelectValidator
          id="select-category"
          select
          label="Select"
          name="category"
          fullWidth
          value={category}
          onChange={this.handleChange('category')}
          validators={['required']}
          errorMessages={['This field is required']}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          variant={variant}
        >
          {categories.map(category => (
            <MenuItem key={category.path} value={category.path}>
              {category.name}
            </MenuItem>
          ))}
        </SelectValidator>

       <div className={classes.submit}>
        <Button variant="outlined" color="default" className={classes.button} onClick={() => {this.props.history.goBack()}}>
          Back
        </Button> 
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Save
        </Button>
       </div>

      </ValidatorForm>
    )
  }
}

export default withStyles(styles)(withRouter(Form))