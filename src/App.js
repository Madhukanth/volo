import { useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import orange from "@material-ui/core/colors/orange";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import EditLables from "./components/EditLables";
import Main from "./components/Main";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    marginTop: theme.spacing(8),
    height: `calc(100vh - ${64}px)`,
    width: `calc(100vw - ${drawerWidth}px)`,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  status: {
    danger: orange,
  },
  typography: {
    useNextVariants: true,
  },
});

function App(props) {
  const classes = useStyles();

  const [selected, setSelected] = useState(0);

  const handleClick = (val) => () => {
    setSelected(val);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar></Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />

          <List>
            <ListItem button onClick={handleClick(0)}>
              <ListItemIcon>
                <EmojiObjectsOutlinedIcon
                  color={selected === 0 ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText
                primary="Notes"
                primaryTypographyProps={{
                  color: selected === 0 ? "primary" : "inherit",
                }}
              />
            </ListItem>

            <ListItem button onClick={handleClick(1)}>
              <ListItemIcon>
                <EditOutlinedIcon
                  color={selected === 1 ? "primary" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText
                primary="Edit Lables"
                primaryTypographyProps={{
                  color: selected === 1 ? "primary" : "inherit",
                }}
              />
            </ListItem>
          </List>
        </Drawer>

        <main className={classes.content}>
          {selected === 0 && <Main />}

          {selected === 1 && <EditLables />}
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
