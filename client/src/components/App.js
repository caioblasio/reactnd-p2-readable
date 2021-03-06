import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Home from './Home';
import Header from './Header';
import Category from './Category';
import ManagePost from './ManagePost';
import PostDetail from './PostDetail';
import Favorites from './Favorites';

import classNames from 'classnames';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
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
    
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
    },
  },
  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
  },
  toolbar: theme.mixins.toolbar,
};

class App extends Component {

  render() {
    const { classes, isOpen, isLoading } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <CssBaseline />
              <Header/>
              {isLoading &&
                <LinearProgress color="primary" className={classes.loading}/>
              }
              <div className={classNames(classes.content, {
                  [classes.contentShift]: isOpen,
                })}>
                <div className={classes.drawerHeader}/>
                <Fragment>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/new" component={ManagePost} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Route
                      exact path="/edit/:post"
                      render={props => (
                        <ManagePost edit postId={props.match.params.post} />
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

const mapStateToProps = ({ drawer, loading }) => ({ isOpen: drawer, isLoading: loading })

export default withStyles(styles)(connect(mapStateToProps)(App));
