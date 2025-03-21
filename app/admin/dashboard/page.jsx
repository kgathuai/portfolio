"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true once component is mounted
    setMounted(true);

    // Check if user is authenticated
    const checkAuth = () => {
      // Only access localStorage after component is mounted
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        console.log("Auth check:", { hasToken: !!token, user });

        if (!token || !user || !user.isAdmin) {
          console.log("Not authenticated, redirecting to login");
          window.location.href = "/admin/login";
          return false;
        }

        return true;
      }
      return false;
    };

    if (mounted) {
      const isAuth = checkAuth();
      setIsAuthenticated(isAuth);
      setAuthChecking(false);

      if (isAuth) {
        fetchProjects();
      }
    }
  }, [mounted]);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Include the token in the request headers
      const response = await fetch("/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message || "An error occurred while fetching projects");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    if (newValue === 0) {
      setSelectedProject(null);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }

      await fetchProjects();
      setTab(0); // Switch to project list tab
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateProject = async (projectData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/projects/${selectedProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update project");
      }

      await fetchProjects();
      setTab(0); // Switch to project list tab
      setSelectedProject(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete project");
      }

      await fetchProjects();
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setTab(1); // Switch to edit tab
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  };

  const handleBackToWebsite = () => {
    window.location.href = "/";
  };

  // If not mounted yet, return a loading state to prevent hydration errors
  if (!mounted) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (authChecking) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Project Management
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={handleBackToWebsite}
          >
            Back to Website
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="All Projects" />
          <Tab label={selectedProject ? "Edit Project" : "Add Project"} />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setSelectedProject(null);
                setTab(1);
              }}
            >
              Add New Project
            </Button>
          </Box>
          <ProjectList
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            loading={loading}
          />
        </Box>
      )}

      {tab === 1 && (
        <ProjectForm
          project={selectedProject}
          onSubmit={selectedProject ? handleUpdateProject : handleCreateProject}
          isEditing={!!selectedProject}
        />
      )}
    </Container>
  );
}
