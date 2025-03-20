"use client";

import { useState, useEffect } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function AdminButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const checkAdmin = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("token");
        return user && user.isAdmin && token;
      } catch (error) {
        return false;
      }
    };

    setIsAdmin(checkAdmin());

    // Check admin status every 5 minutes in case token expires
    const interval = setInterval(() => {
      setIsAdmin(checkAdmin());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !isAdmin) return null;

  return (
    <Tooltip
      title="Admin Dashboard"
      placement="left"
      TransitionComponent={Zoom}
    >
      <Fab
        color="primary"
        size="medium"
        aria-label="admin"
        onClick={() => router.push("/admin/dashboard")}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <AdminPanelSettings />
      </Fab>
    </Tooltip>
  );
}
