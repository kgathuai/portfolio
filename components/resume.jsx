"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import {
  Phone,
  Email as EmailIcon,
  LocationOn,
  Download,
} from "@mui/icons-material";
import styled from "styled-components";

// Professional resume color scheme
const colors = {
  primary: "#1a4977", // Navy blue for headings
  secondary: "#2c82c9", // Lighter blue for accents
  accent: "#2c82c9", // Accent color for highlights
  divider: "#e0e0e0", // Light gray for dividers
  lightBackground: "#f9f9f9", // Light background for left column
  darkText: "#333333", // Dark text color
  lightText: "#666666", // Light text color
};

const ResumeSection = styled(Paper)`
  padding: 24px;
  margin-bottom: 32px;
  height: 100%;
  box-shadow: none;
  border-radius: 0;
`;

const LeftColumnSection = styled(ResumeSection)`
  background-color: ${colors.lightBackground};
`;

const SectionHeader = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled(Typography)`
  font-weight: 700;
  text-transform: uppercase;
  color: ${colors.primary};
`;

const ResumeItemContainer = styled(Box)`
  margin-bottom: ${(props) => (props.$isLast ? 0 : "24px")};
  color: ${colors.lightBackground};
`;

const SkillChip = styled(Chip)`
  margin-bottom: 8px;
  background-color: ${colors.accent};
  color: white;
`;

const ContactItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledDivider = styled(Divider)`
  background-color: ${colors.secondary};
  height: 2px;
  margin-bottom: 16px;
`;

const DownloadButton = styled(Button)`
  background-color: ${colors.primary};
  color: white;
  &:hover {
    background-color: ${colors.secondary};
  }
`;

export default function Resume() {
  return (
    <Box
      id="resume"
      sx={{
        py: 8,
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 6,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            color={colors.lightBackground}
            sx={{ fontWeight: 700, textTransform: "uppercase" }}
          >
            Resume
          </Typography>

          <DownloadButton
            variant="contained"
            startIcon={<Download />}
            href="/Ernest_Kungu_Njoroge_Resume.pdf"
            download
          >
            Download PDF
          </DownloadButton>
        </Box>

        <Grid container spacing={4}>
          {/* Header with Name and Title */}
          <Grid item xs={12}>
            <ResumeSection
              elevation={0}
              sx={{
                textAlign: "center",
                py: 3,
                bgcolor: colors.primary,
                color: "white",
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 800, textTransform: "uppercase" }}
              >
                ERNEST KUNGU NJOROGE
              </Typography>
              <Typography
                variant="h6"
                sx={{ textTransform: "uppercase", mt: 1 }}
              >
                SOFTWARE ENGINEER
              </Typography>
            </ResumeSection>
          </Grid>

          {/* Two-column layout */}
          <Grid item xs={12} md={4}>
            {/* Left Column - Contact, Skills, Languages, Hobbies */}
            <LeftColumnSection elevation={0}>
              {/* Contact Information */}
              <SectionTitle variant="h6" component="h3" sx={{ mb: 2 }}>
                CONTACT
              </SectionTitle>
              <StyledDivider />

              <ContactItem>
                <LocationOn
                  fontSize="small"
                  sx={{ mr: 1, color: colors.secondary }}
                />
                <Typography variant="body2" color={colors.darkText}>
                  Kiambu Kikuyu
                </Typography>
              </ContactItem>
              <ContactItem>
                <Phone
                  fontSize="small"
                  sx={{ mr: 1, color: colors.secondary }}
                />
                <Typography variant="body2" color={colors.darkText}>
                  +254711263120
                </Typography>
              </ContactItem>
              <ContactItem>
                <EmailIcon
                  fontSize="small"
                  sx={{ mr: 1, color: colors.secondary }}
                />
                <Typography variant="body2" color={colors.darkText}>
                  ernestwaithera@gmail.com
                </Typography>
              </ContactItem>

              {/* Core Qualifications */}
              <SectionTitle variant="h6" component="h3" sx={{ mt: 4, mb: 2 }}>
                CORE QUALIFICATIONS
              </SectionTitle>
              <StyledDivider />

              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                color={colors.secondary}
              >
                HTML/CSS:
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ mb: 2 }}
                color={colors.darkText}
              >
                I have 5 years of experience with HTML and CSS, during which
                I've honed my skills in web development, creating, styling, and
                optimizing websites effectively.
              </Typography>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                color={colors.secondary}
              >
                JavaScript Developer:
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ mb: 2 }}
                color={colors.darkText}
              >
                With four years of experience in JavaScript, I am proficient in
                both frontend and backend development. My expertise is
                demonstrated through the variety of projects I've successfully
                completed.
              </Typography>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                color={colors.secondary}
              >
                ReactJS & NextJS:
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ mb: 2 }}
                color={colors.darkText}
              >
                I have 4 years of experience working with ReactJS and NextJS,
                utilizing various UI libraries like Deity-UI and Material UI.
                I've also worked with different state management tools in React,
                including Redux, React Context, and Apollo Client.
              </Typography>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                color={colors.secondary}
              >
                React Native:
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ mb: 2 }}
                color={colors.darkText}
              >
                I have 2 years of experience developing Android and iOS
                applications using React Native.
              </Typography>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                color={colors.secondary}
              >
                KOA.js, Node.js & GraphQL:
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ mb: 2 }}
                color={colors.darkText}
              >
                I enjoy using Node.js with GraphQL for backend development. In
                my current role, I've worked with KOA.js on various projects. I
                also have experience using Express.js and Apollo Server with
                Node.js, and I've worked with both GraphQL and REST APIs.
              </Typography>

              <Typography
                variant="subtitle2"
                fontWeight={600}
                gutterBottom
                color={colors.secondary}
              >
                AWS:
              </Typography>
              <Typography
                variant="body2"
                paragraph
                sx={{ mb: 2 }}
                color={colors.darkText}
              >
                I have 2 years of experience supporting the Masoko AWS
                environment. Additionally, I've been studying AWS cloud security
                and cloud architecture, and I have earned the AWS Cloud
                Practitioner certification.
              </Typography>

              {/* Languages */}
              <SectionTitle variant="h6" component="h3" sx={{ mt: 4, mb: 2 }}>
                LANGUAGE
              </SectionTitle>
              <StyledDivider />
              <Typography variant="body2" color={colors.darkText}>
                English (Fluent)
              </Typography>
              <Typography variant="body2" color={colors.darkText}>
                Swahili (Native)
              </Typography>
              <Typography variant="body2" color={colors.darkText}>
                German (learning)
              </Typography>

              {/* Hobbies */}
              <SectionTitle variant="h6" component="h3" sx={{ mt: 4, mb: 2 }}>
                HOBBIES AND INTERESTS
              </SectionTitle>
              <StyledDivider />
              <Typography variant="body2" color={colors.darkText}>
                Invention and innovation
              </Typography>
              <Typography variant="body2" color={colors.darkText}>
                Learning new languages and cultures
              </Typography>
              <Typography variant="body2" color={colors.darkText}>
                Contributing to community-based projects
              </Typography>
              <Typography variant="body2" color={colors.darkText}>
                Playing and watching soccer
              </Typography>
              <Typography variant="body2" color={colors.darkText}>
                Reading books, particularly on history, business, and politics
              </Typography>
            </LeftColumnSection>
          </Grid>

          <Grid item xs={12} md={8}>
            {/* Right Column - Summary, Experience, Education */}
            <ResumeSection elevation={0}>
              {/* Professional Summary */}
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 4 }}
                color={colors.lightBackground}
              >
                I am a highly skilled Software Developer with a proven track
                record in designing and developing web applications, Android and
                iOS apps, REST APIs, and relational databases. I possess strong
                technical abilities and excellent interpersonal skills, allowing
                me to interact effectively with clients and collaborate well
                with teammates. I thrive on challenges that foster growth and
                development, and I am passionate about guiding projects and
                organizations toward their goals through the application of
                relevant technologies.
              </Typography>

              {/* Experience */}
              <SectionTitle
                variant="h6"
                component="h3"
                sx={{ mb: 2 }}
                style={{
                  color: colors.lightBackground,
                }}
              >
                EXPERIENCE
              </SectionTitle>
              <StyledDivider />

              <ResumeItem
                title="Web Developer, Safaricom PLC (Contractor)"
                period="May 2021 – Present"
                description={
                  <ul
                    style={{
                      paddingLeft: "20px",
                      marginTop: "8px",
                      color: colors.lightBackground,
                    }}
                  >
                    <li>
                      Developing web applications using ReactJS, NextJS, Redux,
                      Node.js, and GraphQL
                    </li>
                    <li>
                      Managing and supporting Magento and AWS Lambda functions
                    </li>
                    <li>
                      Leading the frontend team and overseeing the Jira board
                    </li>
                    <li>
                      Coordinating with stakeholders for system upgrades and
                      managing backlog with the assistance of an Agile coach
                    </li>
                    <li>
                      Supporting and updating mobile and iOS apps using React
                      Native
                    </li>
                  </ul>
                }
              />

              <ResumeItem
                title="Software Engineer, SmartChip ltd"
                period="March 2020 to May 2021"
                description={
                  <ul
                    style={{
                      paddingLeft: "20px",
                      marginTop: "8px",
                      color: colors.lightBackground,
                    }}
                  >
                    <li>
                      Installing and upgrading POS Systems, Hospital Management
                      System, School Management System and Property Management
                      System
                    </li>
                    <li>
                      Web App Development using Reactjs, Nodejs and AWS
                      Technologies
                    </li>
                    <li>Supervision of Website Development</li>
                    <li>
                      Identify, prioritize and execute tasks in the software
                      development life cycle
                    </li>
                    <li>
                      Develop tools and applications by producing clean,
                      efficient code
                    </li>
                    <li>Review and debug code</li>
                    <li>
                      Collaborate with internal teams and vendors to fix and
                      improve products
                    </li>
                    <li>
                      Ensure software is up-to-date with latest technologies
                    </li>
                  </ul>
                }
              />

              <ResumeItem
                title="CEO and Founder, Elimusmart Startup"
                period="November 2017 – December 2019"
                description={
                  <>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1 }}
                      color={colors.lightBackground}
                    >
                      Elimusmart was a platform for sharing learning resources
                      across higher education institutions, serving as a hub for
                      students worldwide studying similar courses.
                    </Typography>
                    <ul
                      style={{
                        paddingLeft: "20px",
                        marginTop: "8px",
                        color: colors.lightBackground,
                      }}
                    >
                      <li>
                        Coordinated the team and presented the solution to
                        investors
                      </li>
                      <li>Oversaw website and mobile app development</li>
                      <li>Managed all administrative tasks</li>
                      <li>Organized meetings on behalf of the team</li>
                    </ul>
                  </>
                }
              />

              {/* Education */}
              <SectionTitle
                variant="h6"
                component="h3"
                sx={{ mt: 4, mb: 2 }}
                style={{
                  color: colors.lightBackground,
                }}
              >
                EDUCATION
              </SectionTitle>
              <StyledDivider />

              <Typography
                variant="subtitle1"
                fontWeight={600}
                color={colors.lightBackground}
              >
                Moi University
              </Typography>
              <Typography variant="body2" color={colors.lightBackground}>
                Bachelor's Degree in Mathematics and Geography
              </Typography>

              {/* Certifications */}
              <SectionTitle
                variant="h6"
                component="h3"
                sx={{ mt: 4, mb: 2 }}
                style={{
                  color: colors.lightBackground,
                }}
              >
                PROFESSIONAL CERTIFICATIONS
              </SectionTitle>
              <StyledDivider />

              <Typography
                variant="body2"
                paragraph
                color={colors.lightBackground}
              >
                Completed various LinkedIn Learning certifications, including
                GraphQL, AWS Fundamentals and Architect, JavaScript, and Agile
                101.
              </Typography>
              <Typography variant="body2" color={colors.lightBackground}>
                I am actively pursuing knowledge in Python, AI, and Big Data
                through the company's learning portal and Udemy.
              </Typography>
            </ResumeSection>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function ResumeItem({ title, period, description, isLast = false }) {
  return (
    <ResumeItemContainer $isLast={isLast}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        color={colors.lightBackground}
      >
        {title}
      </Typography>
      <Typography variant="body2" color={colors.lightText}>
        {period}
      </Typography>
      {typeof description === "string"
        ? description && (
            <Typography variant="body2" color={colors.darkText}>
              {description}
            </Typography>
          )
        : description}
    </ResumeItemContainer>
  );
}
