import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared';
import SearchAppBar from './SearchAppBar';
import ResponsiveDrawer from './Drawer';

import blue from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import Home from './Home';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
  drawerWidth: 240
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
    padding: theme.spacing.unit * 4
  },
};

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(handleInitialData())
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
              {isLoading && <div>Loading...</div>}
              {!isLoading &&
                <Fragment>
                  <ResponsiveDrawer/>
                  <div className={`${classes.root} ${!isOpen ? classes.rootFull : ''}`}>
                    <div className={classes.container}>
                      <Route path='/' exact component={Home} />
                      <Route
                        exact
                        path="/:category"
                        render={props => (
                          <Home category={props.match.params.category} />
                        )}
                      />
                    </div>
                  </div>
                </Fragment>
              }
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
    isLoading: loading,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(App));
