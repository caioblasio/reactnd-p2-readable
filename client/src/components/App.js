import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import { fetchCategories } from '../actions/categories';
import SearchAppBar from './SearchAppBar';
import ResponsiveDrawer from './Drawer';

import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Home from './Home';
import Category from './Category';
import NewPost from './NewPost';
import PostDetail from './PostDetail';

import classNames from 'classnames';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: grey,
  },
  typography: {
    useNextVariants: true,
  },
  link: {
    textDecoration: 'initial',
    color: 'inherit',
  },
  drawerWidth: 240,
});

const styles = {
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.drawerWidth,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
  },
  toolbar: theme.mixins.toolbar,
};

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(fetchCategories())
  }

  render() {
    const { classes, isOpen, isLoading } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <CssBaseline />
              <SearchAppBar/>
              <ResponsiveDrawer/>
              {isLoading &&
                <LinearProgress color="secondary" className={classes.loading}/>
              }
              <div className={classNames(classes.content, {
                  [classes.contentShift]: isOpen,
                })}>
                <div className={classes.drawerHeader}/>
                <Fragment>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/new" component={NewPost} />
                    <Route
                      exact path="/edit/:post"
                      render={props => (
                        <NewPost postId={props.match.params.post} />
                      )}
                    />
                    <Route
                      exact path="/:category"
                      render={props => (
                        <Category category={props.match.params.category} />
                      )}
                    />
                    <Route 
                      exact path="/:category/:post" 
                      render={props => (
                        <PostDetail id={props.match.params.post} {...props} />
                      )} 
                    />
                  </Switch>
                </Fragment>
              </div>
            </Fragment>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ drawer, loading }) {
  return {
    isOpen: drawer,
    isLoading: loading
  }
}

export default withStyles(styles)(connect(mapStateToProps)(App));
