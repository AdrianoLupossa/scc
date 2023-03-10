"use client";

import * as React from "react";
import Link from "next/link";
import { styled, alpha } from "@mui/material/styles";
import useAuthStore from "@/app/auth/store";
import { useRouter } from "next/navigation";
import { links } from "@/app/data/links";

// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
// import InputBase from "@mui/material/InputBase";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  ListItem,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
} from "@mui/material";

import Sidebar from "../Sidebar";
import logout from "@/app/auth/modules/logout";
import SpinLoad from "../SpinLoad";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, setUser } = useAuthStore();
  const { push } = useRouter();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Sidebar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginRight: 2, cursor: "pointer" }}
          >
            <Link href="/" title="Voltar para o Inicio">
              SCC
            </Link>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Pesquisar..."
              inputProps={{ "aria-label": "pesquisa" }}
            />
          </Search>
          <div>
            <IconButton
              size="large"
              aria-label="Conta do usuário logado"
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
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <ListItem>{`Olá, ${user?.fullName.split(" ")[0]}`}</ListItem>
              <Divider />
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              {user?.uid ? (
                <MenuItem
                  onClick={() => {
                    logout(setUser);
                    setIsLoading(true);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <SpinLoad size={20} fallback="Saindo..." />
                  ) : (
                    links.logout.title
                  )}
                </MenuItem>
              ) : (
                <MenuItem
                  disabled={isLoading}
                  onClick={() => push(links.login.href)}
                >
                  {links.login.title}
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
