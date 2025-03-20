"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SecretLoginTrigger from "./SecretLoginTrigger";
import Dashboard from "@mui/icons-material/Dashboard";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import Logo from "./Logo";

const pages = ["Home", "Resume", "Projects"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [secretClicks, setSecretClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    checkAuthStatus();

    // Check auth status every minute in case token expires
    const interval = setInterval(checkAuthStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkAuthStatus = () => {
    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setIsLoggedIn(!!token);
        setIsAdmin(user && user.isAdmin);
      } catch (error) {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const scrollToSection = (sectionId) => {
    handleCloseNavMenu();
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Secret click handler for your logo
  const handleSecretClick = (e) => {
    e.preventDefault(); // Prevent default navigation

    const now = Date.now();

    // Reset counter if more than 2 seconds between clicks
    if (now - lastClickTime > 2000) {
      setSecretClicks(1);
    } else {
      setSecretClicks(secretClicks + 1);
    }

    setLastClickTime(now);

    // After 5 rapid clicks, go to login
    if (secretClicks >= 4) {
      router.push("/admin/login");
      setSecretClicks(0);
    }
  };

  const handleLogin = () => {
    router.push("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/");
  };

  const handleDashboard = () => {
    router.push("/admin/dashboard");
  };

  // Don't render auth buttons until we've checked auth status on client
  const authButtons = mounted ? (
    isLoggedIn ? (
      <>
        {isAdmin && (
          <Button
            onClick={handleDashboard}
            sx={{ ml: 1, color: "white" }}
            startIcon={<Dashboard />}
            variant="contained"
            color="secondary"
          >
            Dashboard
          </Button>
        )}
        <Button onClick={handleLogout} sx={{ ml: 1 }} startIcon={<Logout />}>
          Logout
        </Button>
      </>
    ) : (
      <Button onClick={handleLogin} sx={{ ml: 1 }} startIcon={<Login />}>
        Login
      </Button>
    )
  ) : null;

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "background.paper" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <Logo onClick={handleSecretClick} size="medium" />
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => scrollToSection(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <Logo onClick={handleSecretClick} size="small" />
          </Box>

          {/* Desktop navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => scrollToSection(page)}
                sx={{ my: 2, color: "text.primary", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
      <SecretLoginTrigger />
    </AppBar>
  );
}
