"use client";

import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  AdminPanelSettings,
} from "@mui/icons-material";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";

// Create a separate client component for the admin URL parameter functionality
function AdminUrlHandler() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Only run this code on the client side
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const adminParam = url.searchParams.get("admin");

      if (adminParam === "ernest123") {
        router.push("/admin/login");
      }
    }
  }, [router]);

  return null; // This component doesn't render anything
}

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Check auth status
  useEffect(() => {
    setMounted(true);

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

    // Update year if needed
    setYear(new Date().getFullYear());
  }, []);

  const handleAdminClick = () => {
    router.push("/admin/login");
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      {/* Include the admin URL handler */}
      <Suspense fallback={null}>
        <AdminUrlHandler />
      </Suspense>

      <Container maxWidth="lg">
        <Stack direction="column" spacing={3} alignItems="center">
          {/* Top row with navigation and social icons */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            {/* Navigation links */}
            <Stack direction="row" spacing={2}>
              <Link href="#home" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="#resume" color="inherit" underline="hover">
                Resume
              </Link>
              <Link href="#projects" color="inherit" underline="hover">
                Projects
              </Link>
            </Stack>

            {/* Social media icons */}
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                color="inherit"
                aria-label="GitHub"
                href="https://github.com/kgathuai"
                target="_blank"
              >
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                aria-label="LinkedIn"
                href="https://linkedin.com/in/ernest-njoroge-82a07214"
                target="_blank"
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                aria-label="Twitter"
                href="https://twitter.com/kungu_ernest"
                target="_blank"
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                aria-label="Email"
                href="mailto:ernestwaithera@gmail.com"
              >
                <Email fontSize="small" />
              </IconButton>

              {/* Admin button - subtle but accessible */}
              <IconButton
                size="small"
                color="inherit"
                aria-label="Admin"
                onClick={handleAdminClick}
                sx={{
                  opacity: 0.5,
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <AdminPanelSettings fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {/* Copyright text - now at the bottom and center-aligned */}
          <Typography variant="body2" color="text.secondary" align="center">
            © {year} Ernest Kungu Njoroge. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
