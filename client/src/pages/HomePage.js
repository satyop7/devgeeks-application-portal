import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Grid, Fade, Grow } from '@mui/material';
import { Code, Group, Rocket } from '@mui/icons-material';
import JobList from '../components/JobList';

const FeatureCard = ({ icon, title, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grow in timeout={600 + delay}>
      <Paper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          p: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: isHovered
            ? 'linear-gradient(145deg, rgba(57, 255, 20, 0.12), rgba(20, 255, 229, 0.12))'
            : 'linear-gradient(145deg, rgba(57, 255, 20, 0.08), rgba(20, 255, 229, 0.08))',
          border: '1px solid',
          borderColor: isHovered ? 'primary.main' : 'rgba(255, 255, 255, 0.08)',
          borderRadius: 3,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? '0 12px 40px rgba(57, 255, 20, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          sx={{
            color: 'primary.main',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: isHovered
              ? 'rgba(57, 255, 20, 0.2)'
              : 'rgba(57, 255, 20, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          }}
        >
          {React.cloneElement(icon, {
            sx: {
              fontSize: 36,
              transition: 'all 0.3s ease',
              color: isHovered ? 'primary.light' : 'primary.main',
            }
          })}
        </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: isHovered ? 'primary.light' : 'primary.main',
            fontWeight: 700,
            mb: 2,
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: '280px',
            mx: 'auto',
            lineHeight: 1.7,
            fontSize: '0.95rem',
          }}
        >
          {description}
        </Typography>
      </Paper>
    </Grow>
  );
};

const HomePage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          position: 'relative',
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 4, md: 6 },
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #0A0A0A 0%, #1A1A1A 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(57, 255, 20, 0.05), transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={visible} timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                  background: 'linear-gradient(135deg, #39FF14 0%, #14FFE5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  letterSpacing: '-0.02em',
                }}
              >
                DevGeeks Internships Portal
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  maxWidth: 800,
                  mx: 'auto',
                  mb: 2,
                  color: 'text.secondary',
                  fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                Your Gateway to Tech Opportunities
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: 600,
                  mx: 'auto',
                  color: 'text.secondary',
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                  opacity: 0.8,
                }}
              >
                Powered by the DevGeeks Community
              </Typography>
            </Box>
          </Fade>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            sx={{
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <FeatureCard
                icon={<Code />}
                title="Tech-Focused Internships"
                description="Discover curated internship opportunities tailored for aspiring developers, designers, and tech enthusiasts."
                delay={0}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <FeatureCard
                icon={<Group />}
                title="Community-Driven"
                description="Every internship is vetted by the DevGeeks community to ensure meaningful learning experiences."
                delay={100}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <FeatureCard
                icon={<Rocket />}
                title="Launch Your Career"
                description="Start your tech journey with hands-on internships designed to build your skills and portfolio."
                delay={200}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Fade in={visible} timeout={1000}>
          <Box>
            <JobList />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default HomePage;
