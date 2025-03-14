import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Header({ title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <Button
          sx={{ marginLeft: "30px", color: "white", fontWeight: "bold" }}
          endIcon={<ArrowDropDownIcon />}
          onClick={handleClick}
        >
          Quick Access
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ mt: "5px" }}
        >
          <MenuItem
            onClick={() => window.open("https://chat.openai.com/", "_blank")}
          >
            🤖 ChatGPT
          </MenuItem>
          <MenuItem
            onClick={() => window.open("https://www.canva.com/", "_blank")}
          >
            ✨ Canva
          </MenuItem>
          <MenuItem
            onClick={() => window.open("https://www.pinterest.com/", "_blank")}
          >
            📌 Pinterest
          </MenuItem>
          <MenuItem
            onClick={() =>
              window.open(
                "https://moodle.augustana.edu/login/index.php",
                "_blank"
              )
            }
          >
            🎓 Moodle
          </MenuItem>
          <MenuItem
            onClick={() => window.open("https://docs.google.com/", "_blank")}
          >
            📄 Google Docs
          </MenuItem>
          <MenuItem
            onClick={() => window.open("https://drive.google.com/", "_blank")}
          >
            📂 Google Drive
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
