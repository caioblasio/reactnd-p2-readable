import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';


import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteAdd from '@material-ui/icons/NoteAdd';
import StarIcon from '@material-ui/icons/Star';


import { Link } from 'react-router-dom';

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: theme.drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  link: {
    ...theme.link
  },
  toolbar: theme.mixins.toolbar,
});

class ResponsiveDrawer extends React.Component {

  render() {
    const { isOpen, categories, toggleDrawer, classes, theme } = this.props;

    const drawer = (
      <Fragment>
        <div className={classes.toolbar} />
        <Divider />
        <List
          component="nav"
          subheader={<ListSubheader component="div">Categories</ListSubheader>}
        >
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemText primary="All" />
            </ListItem>
          </Link>
          {categories.map(category => (
            <Link key={category.path} to={`/${category.path}`} className={classes.link}>
              <ListItem key={category.path} button>
                <ListItemText primary={category.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List
          component="nav"
          subheader={<ListSubheader component="div">Posts</ListSubheader>}
        >
          <Link to="/new" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <NoteAdd />
              </ListItemIcon>
              <ListItemText primary="Create Post" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Fragment>
    );

    return (
      <Fragment>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={isOpen}
            onClose={toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="persistent"
            open={isOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Fragment>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);