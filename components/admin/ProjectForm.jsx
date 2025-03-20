"use client"

import { useState, useEffect } from "react"
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Slider,
  Typography,
  Paper,
  Grid,
  Alert,
} from "@mui/material"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const availableTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Redux",
  "Material UI",
  "Tailwind CSS",
  "GraphQL",
  "REST API",
  "AWS",
  "Docker",
  "Git",
  "CI/CD",
  "Jest",
  "React Native",
]

export default function ProjectForm({ project, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    completion: 0,
    category: "",
    technologies: [],
    github: "",
    demo: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (project && isEditing) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        image: project.image || "",
        completion: project.completion || 0,
        category: project.category || "",
        technologies: project.technologies || [],
        github: project.github || "",
        demo: project.demo || "",
      })
    }
  }, [project, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTechnologiesChange = (event) => {
    const { value } = event.target
    setFormData((prev) => ({ ...prev, technologies: typeof value === "string" ? value.split(",") : value }))
  }

  const handleCompletionChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, completion: newValue }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await onSubmit(formData)
      setSuccess(isEditing ? "Project updated successfully!" : "Project created successfully!")

      if (!isEditing) {
        // Reset form if creating a new project
        setFormData({
          title: "",
          description: "",
          image: "",
          completion: 0,
          category: "",
          technologies: [],
          github: "",
          demo: "",
        })
      }
    } catch (error) {
      setError(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Edit Project" : "Add New Project"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Project Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              helperText="Enter a URL for the project image"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select name="category" value={formData.category} onChange={handleChange} label="Category">
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="backend">Backend</MenuItem>
                <MenuItem value="fullstack">Full Stack</MenuItem>
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Completion: {formData.completion}%</Typography>
            <Slider
              value={formData.completion}
              onChange={handleCompletionChange}
              aria-labelledby="completion-slider"
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={100}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Technologies</InputLabel>
              <Select
                multiple
                value={formData.technologies}
                onChange={handleTechnologiesChange}
                input={<OutlinedInput label="Technologies" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {availableTechnologies.map((tech) => (
                  <MenuItem key={tech} value={tech}>
                    {tech}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="GitHub URL" name="github" value={formData.github} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Demo URL" name="demo" value={formData.demo} onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? "Submitting..." : isEditing ? "Update Project" : "Add Project"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

