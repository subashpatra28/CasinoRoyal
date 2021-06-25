import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Login from "../login/Login";
import SaveLocalStorage from "../storage/UseLocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  const { state, dispatch } = useAppContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLogin = () => {
    setOpenModal(true);
  };
  const closeLogin = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    handleClose();
    dispatch({ type: "LOGOUT" });
  };
  const handleLogin = (username) => {
    dispatch({
      type: "LOGIN",
      payload: {
        user: SaveLocalStorage({ username }, { type: "LOGIN", key: "USER" }),
        isAuthenticated: true,
      },
    });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6">Royal Casino</Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-suit-spade-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.184 11.246A3.5 3.5 0 0 1 1 9c0-1.602 1.14-2.633 2.66-4.008C4.986 3.792 6.602 2.33 8 0c1.398 2.33 3.014 3.792 4.34 4.992C13.86 6.367 15 7.398 15 9a3.5 3.5 0 0 1-6.184 2.246 19.92 19.92 0 0 0 1.582 2.907c.231.35-.02.847-.438.847H6.04c-.419 0-.67-.497-.438-.847a19.919 19.919 0 0 0 1.582-2.907z" />
            </svg>
          </div>

          {state.isAuthenticated ? (
            <div
              style={{
                display: "flex",
                width: "100px",
                justifyContent: "space-evenly",
              }}
            >
              <Typography style={{ alignSelf: "center" }} variant="h3">
                ${state.user.money.toFixed(2)}
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>User: {state.user.username}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button onClick={openLogin} color="inherit">
                Login
              </Button>
              <Login
                isOpen={openModal}
                closeModal={closeLogin}
                loginIn={handleLogin}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
