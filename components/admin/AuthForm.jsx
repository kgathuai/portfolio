"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link,
  Collapse,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthForm({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" or "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Add this effect to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoginMode = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = isLoginMode ? "/api/auth/login" : "/api/auth/register";

      // Prepare request body based on mode
      const requestBody = isLoginMode
        ? { username, password }
        : { username, password, adminSecret };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `${isLoginMode ? "Login" : "Registration"} failed`
        );
      }

      if (isLoginMode) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Add console logging
        console.log("Login successful, storing token and redirecting...");

        // Use direct window location change instead of router.push
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 100);
      } else {
        // Show success message and switch to login mode
        setSuccess("Admin user created successfully! You can now log in.");
        setMode("login");
        setUsername("");
        setPassword("");
        setAdminSecret("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(isLoginMode ? "register" : "login");
    setError("");
    setSuccess("");
  };

  // If not mounted yet, return a placeholder to prevent hydration errors
  if (!mounted) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              {isLoginMode ? "Admin Login" : "Create Admin Account"}
            </Typography>
            {/* Render a skeleton or loading state */}
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {isLoginMode ? "Admin Login" : "Create Admin Account"}
          </Typography>

          {!isLoginMode && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              This form should only be used once to create the initial admin
              account.
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={isLoginMode ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Admin Secret field - only shown in register mode */}
            <Collapse in={!isLoginMode}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="adminSecret"
                label="Admin Secret"
                type="password"
                id="adminSecret"
                helperText="Enter the ADMIN_SECRET from your .env file"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
              />
            </Collapse>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading
                ? isLoginMode
                  ? "Logging in..."
                  : "Creating Account..."
                : isLoginMode
                ? "Login"
                : "Create Admin Account"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode();
                }}
                sx={{ cursor: "pointer" }}
              >
                {isLoginMode
                  ? "Need to create an admin account?"
                  : "Already have an account? Login"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
