import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import uuidv1 from 'uuid/v1';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class Form extends Component {

  state = {
    body: '',
    author: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { body, author } = this.state,
      { onSubmit } = this.props;

    onSubmit({
      id: uuidv1(),
      timestamp: Date.now(),
      body,
      author
    });

    this.setState({ body: '' , author: ''});

  }

  render() {
    const { body, author } = this.state,
      { classes } = this.props;

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
           <TextValidator
            id="author"
            label="Author"
            multiline
            rows="1"
            fullWidth
            value={author}
            onChange={this.handleChange('author')}
            margin="normal"
            variant="outlined"
            name="author"
            validators={['required']}
            errorMessages={['This field is required']}
          />
        <div className={classes.submit}>
          <Button variant="contained" color="primary" type="submit" >
            Save Comment
          </Button>
        </div>
      </ValidatorForm>
    )
  }
}

export default withStyles(styles)(Form);