
import React from 'react';
import { Box, Typography, Container, Paper, Grid } from '@mui/material';
import { Code, Group, Rocket } from '@mui/icons-material';
import JobList from '../components/JobList';

const FeatureCard = ({ icon, title, description }) => (
  <Paper
    sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: 'linear-gradient(145deg, rgba(57, 255, 20, 0.1), rgba(20, 255, 229, 0.1))',
      border: '1px solid',
      borderColor: 'primary.main',
      borderRadius: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: (theme) => `0 4px 20px ${theme.palette.primary.main}25`,
      },
    }}
  >
    <Box 
      sx={{ 
        color: 'primary.main',
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(57, 255, 20, 0.1)',
      }}
    >
      {icon}
    </Box>
    <Typography 
      variant="h6" 
      gutterBottom 
      sx={{ 
        color: 'primary.light',
        fontWeight: 600,
        mb: 2
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
        lineHeight: 1.6
      }}
    >
      {description}
    </Typography>
  </Paper>
);

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper
        sx={{
          py: 8,
          px: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(145deg, #121212, #1E1E1E)',
          borderRadius: 0,
          mb: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #39FF14, #14FFE5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          DevGeeks Internships Portal
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            mb: 6,
            color: 'text.secondary',
          }}
        >
          Your Gateway to Tech Opportunities - Powered by the DevGeeks Community
        </Typography>

        <Box sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 4 } }}>
          <Grid 
            container 
            spacing={4} 
            sx={{
              mt: 2,
              mb: 4,
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <FeatureCard
                icon={<Code sx={{ fontSize: 32 }} />}
                title="Tech-Focused Internships"
                description="Discover curated internship opportunities tailored for aspiring developers, designers, and tech enthusiasts."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <FeatureCard
                icon={<Group sx={{ fontSize: 32 }} />}
                title="Community-Driven"
                description="Every internship is vetted by the DevGeeks community to ensure meaningful learning experiences."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <FeatureCard
                icon={<Rocket sx={{ fontSize: 32 }} />}
                title="Launch Your Career"
                description="Start your tech journey with hands-on internships designed to build your skills and portfolio."
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Container maxWidth="lg">
        <JobList />
      </Container>
    </Box>
  );
};

export default HomePage;
