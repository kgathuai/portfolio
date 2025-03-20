"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  LinearProgress,
  Chip,
  Stack,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import { GitHub, Launch } from "@mui/icons-material";
import styled from "styled-components";

// Fix: Use simpler styled-components that don't rely on theme
const ProjectCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ProgressContainer = styled(Box)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ProgressHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const StyledProgress = styled(LinearProgress)`
  height: 8px;
  border-radius: 4px;
  margin-bottom: 16px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const TechChip = styled(Chip)`
  margin-bottom: 8px;
`;

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message || "Failed to load projects");
        setProjects([]); // Set empty array instead of fallback projects
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
  };

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  if (loading) {
    return (
      <Box
        id="projects"
        sx={{
          py: 8,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      id="projects"
      sx={{
        py: 8,
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Projects
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          A selection of projects I've worked on, with completion percentages
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}. Please try again later.
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            centered
            sx={{ mb: 2 }}
          >
            <Tab label="All" value="all" />
            <Tab label="Frontend" value="frontend" />
            <Tab label="Backend" value="backend" />
            <Tab label="Full Stack" value="fullstack" />
            <Tab label="Mobile" value="mobile" />
          </Tabs>
        </Box>

        {projects.length === 0 ? (
          <Typography align="center" sx={{ py: 4 }}>
            {error
              ? "Unable to load projects."
              : "No projects found in this category."}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredProjects.map((project) => (
              <Grid item key={project._id || project.id} xs={12} sm={6} md={4}>
                <ProjectCard elevation={2}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {project.description}
                    </Typography>

                    <ProgressContainer>
                      <ProgressHeader>
                        <Typography variant="body2" color="text.secondary">
                          Completion
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {project.completion}%
                        </Typography>
                      </ProgressHeader>
                      <StyledProgress
                        variant="determinate"
                        value={project.completion}
                        sx={{
                          "& .MuiLinearProgress-bar": {
                            backgroundColor:
                              project.completion === 100
                                ? "success.main"
                                : project.completion >= 75
                                ? "info.main"
                                : project.completion >= 50
                                ? "warning.main"
                                : "error.main",
                          },
                        }}
                      />
                    </ProgressContainer>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      {project.technologies.slice(0, 3).map((tech) => (
                        <TechChip key={tech} label={tech} size="small" />
                      ))}
                      {project.technologies.length > 3 && (
                        <TechChip
                          label={`+${project.technologies.length - 3}`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    {project.github && (
                      <Button
                        size="small"
                        startIcon={<GitHub />}
                        href={project.github}
                        target="_blank"
                      >
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        size="small"
                        startIcon={<Launch />}
                        href={project.demo}
                        target="_blank"
                      >
                        Demo
                      </Button>
                    )}
                  </CardActions>
                </ProjectCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
