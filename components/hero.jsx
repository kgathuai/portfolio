"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import styled from "styled-components";
import { motion } from "framer-motion";

const IconButton = styled(Button)`
  min-width: auto;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const AnimatedText = ({ text, delay = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {text}
    </motion.span>
  );
};

const TypedText = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));

        if (displayText.length === currentFullText.length) {
          // Pause at the end of typing
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(150);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));

        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts, typingSpeed]);

  return (
    <Typography
      variant="h5"
      align="center"
      color="text.secondary"
      sx={{
        minHeight: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
        style={{ marginLeft: "2px", fontWeight: "bold" }}
      >
        |
      </motion.span>
    </Typography>
  );
};

export default function Hero() {
  const theme = useTheme();

  const typedTexts = [
    "Software Engineer",
    "Web Developer",
    "React Specialist",
    "Problem Solver",
    "Continuous Learner",
  ];

  return (
    <Box
      id="home"
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 107%, ${theme.palette.primary.light}22 0%, ${theme.palette.primary.main}11 5%, transparent 45%)`,
          zIndex: 0,
        }}
      />

      {/* Animated shapes */}
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          background: `${theme.palette.primary.main}11`,
          zIndex: 0,
        }}
        animate={{
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
          background: `${theme.palette.secondary.main}11`,
          zIndex: 0,
        }}
        animate={{
          borderRadius: [
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 400 }}
          >
            <AnimatedText text="Ernest Kungu Njoroge" />
          </Typography>
        </motion.div>

        <TypedText texts={typedTexts} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}
          >
            I am an innovative JavaScript Full Stack Developer passionate about
            building exceptional and accessible digital experiences for the web.
            With expertise in React, Next.js, Node.js, and Python, I craft
            intuitive user interfaces and robust backend solutions that enhance
            performance and usability. Always eager to push boundaries, I am
            currently expanding my skill set by diving into Big Data and AI,
            blending development expertise with intelligent data-driven
            solutions. My commitment to continuous learning and problem-solving
            makes me a versatile technologist ready to tackle modern web
            challenges. Explore my work and see how I bring ideas to life—let's
            connect and build something amazing!
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              color="primary"
              href="#projects"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href="#resume"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </Button>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton
              href="https://github.com/kgathuai"
              target="_blank"
              aria-label="GitHub"
              component={motion.button}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/ernest-njoroge-82a07214"
              target="_blank"
              aria-label="LinkedIn"
              component={motion.button}
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="mailto:kgathuai@gmail.com"
              aria-label="Email"
              component={motion.button}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Email />
            </IconButton>
          </Stack>
        </motion.div>

        {/* Removed the scroll indicator that was moving up and down */}
      </Container>
    </Box>
  );
}
