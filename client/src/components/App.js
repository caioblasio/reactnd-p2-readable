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
import NewPost from './NewPost';
import PostDetail from './PostDetail';

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
    marginLeft: theme.drawerWidth,
    marginTop: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
    transition: 'margin-left .25s cubic-bezier(0.4,0.0,0.2,1),visibility 0s linear 0s'
  },
  rootFull: {
    marginLeft: 0,
  },
  container: {
    padding: theme.spacing.unit * 4,

  },
  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
  }
};

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(fetchCategories())
  }

  render() {
    const { classes, isOpen, isLoading } = this.props;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Fragment>
              <CssBaseline />
              <SearchAppBar/>
              <ResponsiveDrawer/>
              {isLoading &&
                <LinearProgress color="secondary" className={classes.loading}/>
              }
              <div className={`${classes.root} ${!isOpen ? classes.rootFull : ''}`}>
                <div className={classes.container}>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path="/new" component={NewPost} />
                    <Route
                      exact path="/:category"
                      render={props => (
                        <Home category={props.match.params.category} />
                      )}
                    />
                    <Route 
                      exact path="/:category/:post" 
                      render={props => (
                        <PostDetail id={props.match.params.post} />
                      )} 
                    />
                  </Switch>
                </div>
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
