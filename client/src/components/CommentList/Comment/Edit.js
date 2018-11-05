import React, { Component } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class Edit extends Component {

  state = {
    body: this.props.comment.body
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { body } = this.state,
      { comment, toggleEdit, onEditComment } = this.props;

    onEditComment(comment.id, {
      timestamp: Date.now(),
      body
    });

    this.setState({ body: '' });

    toggleEdit(false);
  }

  render() {
    const { body } = this.state,
      { classes, toggleEdit } = this.props;

    return (
      <ValidatorForm autoComplete="off" onSubmit={this.handleSubmit}>
        <TextValidator
          id="body"
          label="Body"
          multiline
          rows="4"
          fullWidth
          value={body}
          onChange={this.handleChange('body')}
          margin="normal"
          variant="outlined"
          name="body"
          validators={['required']}
          errorMessages={['This field is required']}
        />
       <div className={classes.submit}>
        <Button variant="outlined" color="secondary" className={classes.button} onClick={() => {toggleEdit(false)}}>
          Cancel
        </Button> 
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Save Comment
        </Button>
       </div>

      </ValidatorForm>
    )
  }
}

export default withStyles(styles)(Edit);