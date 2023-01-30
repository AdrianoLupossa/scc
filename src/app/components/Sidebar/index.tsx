import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// import { ExitToApp, AccountCircle, FileCopy } from "@mui/icons-material";
import ExitToApp from "@mui/icons-material/ExitToApp";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FileCopy from "@mui/icons-material/FileCopy";
import logout from "@/app/auth/modules/logout";
import useAuthStore from "@/app/auth/store";

export default function Sidebar({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
}) {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const items = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton disabled={isLoading}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton disabled={isLoading}>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Curriculos" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton
            disabled={isLoading}
            onClick={() => {
              logout(setUser);
              setIsLoading(true);
            }}
          >
            <ListItemText
              primary={isLoading ? "Saindo..." : "Terminar sessão"}
            />
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer}>Left</Button> */}
      <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer}>
        {items()}
      </Drawer>
    </div>
  );
}
