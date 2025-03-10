import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesome from "@mui/icons-material/AutoAwesome";

function Header({ title }) {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffb6c1", borderRadius: "5px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
          <FavoriteIcon />
          <AutoAwesome />
          {title}
          <AutoAwesome />
          <FavoriteIcon />
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
