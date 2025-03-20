"use client";

import { useState, useEffect } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { Login, Logout, Dashboard } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function PersistentLoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setIsLoggedIn(!!token);
        setIsAdmin(user && user.isAdmin);
      } catch (error) {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkAuthStatus();

    // Check auth status every 5 minutes in case token expires
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        router.push("/admin/dashboard");
      } else {
        // Logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push("/");
      }
    } else {
      router.push("/admin/login");
    }
  };

  return (
    <Tooltip
      title={isLoggedIn ? (isAdmin ? "Admin Dashboard" : "Logout") : "Login"}
      placement="left"
      TransitionComponent={Zoom}
    >
      <Fab
        color={isLoggedIn ? (isAdmin ? "secondary" : "primary") : "default"}
        size="small"
        aria-label={isLoggedIn ? (isAdmin ? "dashboard" : "logout") : "login"}
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          opacity: 0.7,
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        {isLoggedIn ? isAdmin ? <Dashboard /> : <Logout /> : <Login />}
      </Fab>
    </Tooltip>
  );
}
