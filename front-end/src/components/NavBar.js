import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const pages = [
  { label: "Candidate Information", path: "/candidate-info" },
  { label: "Login", path: "/login" },
  { label: "History", path: "/history"}
];

export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ pr: 2, fontWeight: "bold" }}>
                THAILAND
              </Typography>
              <Typography variant="h6">ELECTION INSIGHT</Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, pl: 5 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path} // Use the 'path' property for navigation
                sx={{ mx: 1, color: "white", display: "block" }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Typography variant="body2" sx={{ pr: 2 }}>
            DES424
          </Typography>
          <Typography variant="body2">GROUP 1</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
