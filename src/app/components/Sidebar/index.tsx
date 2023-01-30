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

export default function Sidebar({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
}) {
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
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FileCopy />
            </ListItemIcon>
            <ListItemText primary="Curriculos" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Terminar sessão" />
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>

      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
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
