import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <AppBar postion="static">
      <Toolbar>
        <Typography variant="h6" component="div" ax={{ flexGrow: 1 }}>
          Treasure App
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/movies">
            Movies
          </Button>
          <Button color="inherit" component={Link} to="/books">
            Books
          </Button>
          <Button color="inherit" component={Link} to="/space">
            Space
          </Button>
          {user ? (
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;