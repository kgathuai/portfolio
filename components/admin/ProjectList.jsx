"use client"

import { useState } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Alert,
} from "@mui/material"
import { Edit, Delete, Visibility } from "@mui/icons-material"

export default function ProjectList({ projects, onEdit, onDelete, loading }) {
  const [deleteDialog, setDeleteDialog] = useState({ open: false, projectId: null })
  const [error, setError] = useState("")

  const handleOpenDeleteDialog = (projectId) => {
    setDeleteDialog({ open: true, projectId })
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, projectId: null })
  }

  const handleConfirmDelete = async () => {
    try {
      await onDelete(deleteDialog.projectId)
      handleCloseDeleteDialog()
    } catch (error) {
      setError(error.message || "Failed to delete project")
    }
  }

  if (loading) {
    return <Typography>Loading projects...</Typography>
  }

  if (projects.length === 0) {
    return <Typography>No projects found. Add your first project!</Typography>
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="projects table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Completion</TableCell>
              <TableCell>Technologies</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell component="th" scope="row">
                  {project.title}
                </TableCell>
                <TableCell>
                  <Chip
                    label={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    color={
                      project.category === "frontend"
                        ? "primary"
                        : project.category === "backend"
                          ? "secondary"
                          : project.category === "fullstack"
                            ? "success"
                            : project.category === "mobile"
                              ? "info"
                              : "default"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{project.completion}%</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Chip key={tech} label={tech} size="small" variant="outlined" />
                    ))}
                    {project.technologies.length > 3 && (
                      <Chip label={`+${project.technologies.length - 3}`} size="small" variant="outlined" />
                    )}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="info"
                    aria-label="view project"
                    href={project.demo || project.github}
                    target="_blank"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton color="primary" aria-label="edit project" onClick={() => onEdit(project)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete project"
                    onClick={() => handleOpenDeleteDialog(project._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

