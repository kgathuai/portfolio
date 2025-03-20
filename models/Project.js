import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  completion: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  technologies: [
    {
      type: String,
    },
  ],
  github: {
    type: String,
  },
  demo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Project || mongoose.model("Project", projectSchema)

