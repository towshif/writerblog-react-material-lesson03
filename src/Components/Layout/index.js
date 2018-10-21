import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { CssBaseline, MenuList, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/icons/Menu'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        // height: 440,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});


class Layout extends Component {
    state = {
        mobileOpen: false,
    }

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }

    render() {
        const { classes, location: { pathname }, children, writers } = this.props
        const { mobileOpen } = this.state

        const drawer = (
            <div>
                <Hidden smDown>
                    <div className={classes.toolbar} />
                </Hidden>
                <MenuList>
                    <MenuItem component={Link} to="/" selected={"/" === pathname}>
                        Home
                    </MenuItem>
                    <MenuItem component={Link} to="/writers" selected={"/writers" === pathname} >
                        Writer
                    </MenuItem>
                    <MenuList>
                        {writers.map(({ name, id }) => {
                            const to = `/writers/${id}`
                            return <MenuItem
                            key={id}
                                component={Link}
                                className={classes.nested}
                                to={to}
                                selected={to === pathname}
                            >
                                {name}
                            </MenuItem>
                        }
                        )}
                    </MenuList>
                </MenuList>
                <Divider />

            </div>
        )

        return <Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Writers Blog
            </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={this.handleDrawerToggle}
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
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                    {console.log("Layout/children: ", children)}

                </main>
            </div>
        </Fragment>
    }
}


export default compose(
    withStyles(styles),
    withRouter
)(Layout)

