import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';

const styles = theme => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  textField: {
    width: '100%',
  },
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

class Form extends Component {

  state = {
    title: this.props.defaultTitle,
    body: this.props.defaultBody,
    author: this.props.defaultAuthor,
    category: this.props.defaultCategory || "" 
  }

  componentWillUnmount() {
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      title: '',
      body: '',
      author: '',
      category: ''
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit(this.state);
    this.clearForm();
  }
 
  render() {
    const { classes, variant, title, body, author, categories } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        {title &&
          <TextField
            id="title"
            label="Title"
            multiline
            rows="1"
            fullWidth
            value={this.state.title}
            onChange={this.handleChange('title')}
            className={classes.textField}
            margin="normal"
            helperText="Type in your awesome post title"
            variant={variant}
            name="title"
        />}
        {body &&
          <TextField
            id="body"
            label="Body"
            multiline
            rows="8"
            fullWidth
            value={this.state.body}
            onChange={this.handleChange('body')}
            className={classes.textField}
            margin="normal"
            helperText="Type in your awesome post body"
            variant={variant}
            name="body"
        />}
        {author &&
          <TextField
            id="author"
            label="Author"
            multiline
            rows="1"
            fullWidth
            value={this.state.author}
            onChange={this.handleChange('author')}
            className={classes.textField}
            margin="normal"
            helperText="Type in your awesome post author"
            variant={variant}
            name="author"
        />}
        {categories &&
          <TextField
            id="select-category"
            select
            label="Select"
            value={this.state.category}
            className={classes.textField}
            onChange={this.handleChange('category')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select the category"
            margin="normal"
            variant={variant}
          >
          {categories.map(category => (
            <MenuItem key={category.path} value={category.path}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        }
       <div className={classes.submit}>
        <Button variant="outlined" color="secondary" className={classes.button} onClick={() => {this.props.history.goBack()}}>
          Cancel
        </Button> 
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Save
        </Button>
       </div>
      </form>
    )
  }
}

export default withStyles(styles)(withRouter(Form))