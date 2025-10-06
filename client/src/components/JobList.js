import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Skeleton,
  Chip,
  Paper,
  Fade,
  Zoom,
  Divider,
} from '@mui/material';
import {
  Work,
  LocationOn,
  ArrowForward,
  Business,
  Payments,
} from '@mui/icons-material';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/api/postings');
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
      <Grid container spacing={3}>
      {[1, 2, 3].map((n) => (
        <Grid item xs={12} sm={6} lg={4} key={n}>
        <Card sx={{ height: 480, minHeight: 480, maxHeight: 480 }}>
        <CardContent>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <Box sx={{ flex: 1 }}>
        <Skeleton variant="rectangular" height={24} sx={{ mb: 1, borderRadius: 1 }} />
        <Skeleton variant="text" height={16} width="70%" />
        </Box>
        </Box>
        <Skeleton variant="text" height={20} width="50%" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={80} sx={{ mb: 2, borderRadius: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={55} height={24} sx={{ borderRadius: 1 }} />
        </Box>
        </CardContent>
        </Card>
        </Grid>
      ))}
      </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
    <Typography
    variant="h4"
    component="h2"
    gutterBottom
    sx={{
      mb: 4,
      fontWeight: 700,
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: 60,
        height: 4,
        background: 'linear-gradient(90deg, #39FF14, #14FFE5)',
          borderRadius: 2,
      }
    }}
    >
    Available Positions
    </Typography>

    <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
    <Grid container spacing={3}>
    {jobs.map((job, index) => (
      <Grid item xs={12} sm={6} lg={4} key={job.id}>
      <Zoom in timeout={300 + index * 100}>
      <Card
      onMouseEnter={() => setHoveredCard(job.id)}
      onMouseLeave={() => setHoveredCard(null)}
      sx={{
        height: 480,
        minHeight: 480,
        maxHeight: 480,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        transform: hoveredCard === job.id ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                               transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                               cursor: 'pointer',
                               '&::before': {
                                 content: '""',
                                 position: 'absolute',
                                 top: 0,
                                 left: 0,
                                 right: 0,
                                 height: 4,
                                 background: 'linear-gradient(90deg, #39FF14, #14FFE5)',
                               opacity: hoveredCard === job.id ? 1 : 0,
                               transition: 'opacity 0.3s ease',
                               },
                               boxShadow: hoveredCard === job.id
                               ? '0 12px 40px rgba(57, 255, 20, 0.25)'
                               : '0 4px 12px rgba(0, 0, 0, 0.5)',
      }}
      onClick={() => navigate(`/apply/${job.id}`)}
      >
      <CardContent sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
      <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(57, 255, 20, 0.15), rgba(20, 255, 229, 0.15))',
                               border: '2px solid',
                               borderColor: hoveredCard === job.id ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               flexShrink: 0,
                               transition: 'border-color 0.3s ease',
      }}
      >
      <Business sx={{ fontSize: 24, color: 'primary.light' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
      variant="h6"
      component="h3"
      sx={{
        fontWeight: 700,
        color: hoveredCard === job.id ? 'primary.light' : 'text.primary',
        transition: 'color 0.3s ease',
        mb: 0.5,
        lineHeight: 1.3,
      }}
      >
      {job.title}
      </Typography>
      <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        display: 'block',
        letterSpacing: '0.5px',
      }}
      >
      Posted 2 days ago
      </Typography>
      </Box>
      {job.salary && (
        <Chip
        icon={<Payments sx={{ fontSize: 16 }} />}
        label={job.salary}
        size="small"
        sx={{
          backgroundColor: hoveredCard === job.id
          ? 'rgba(57, 255, 20, 0.2)'
          : 'rgba(57, 255, 20, 0.1)',
                      color: 'primary.light',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: hoveredCard === job.id ? 'primary.main' : 'transparent',
                      transition: 'all 0.3s ease',
        }}
        />
      )}
      </Box>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
      >
      <Business sx={{ fontSize: 16 }} />
      {job.company || 'Company'}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.disabled' }}>•</Typography>
      <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
      >
      <LocationOn sx={{ fontSize: 16 }} />
      {job.location || 'Remote'}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.disabled' }}>•</Typography>
      <Typography
      variant="body2"
      sx={{
        color: 'text.secondary',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
      }}
      >
      <Work sx={{ fontSize: 16 }} />
      {job.type || 'Full-time'}
      </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.08)' }} />

      <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        mb: 2,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 1.6,
      }}
      >
      {job.description}
      </Typography>

      {job.requirements && (
        <Box sx={{ mb: 2 }}>
        <Typography
        variant="caption"
        sx={{
          display: 'block',
          color: 'text.secondary',
          fontWeight: 700,
          mb: 1,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '0.7rem',
        }}
        >
        Requirements
        </Typography>
        <Box
        component="ul"
        sx={{
          m: 0,
          pl: 2.5,
          '& li': {
            mb: 0.5,
            color: 'text.secondary',
            fontSize: '0.85rem',
            lineHeight: 1.6,
          },
        }}
        >
        {job.requirements.split('.').filter(req => req.trim()).slice(0, 3).map((req, idx) => (
          <li key={idx}>{req.trim()}</li>
        ))}
        </Box>
        </Box>
      )}

      {job.skills && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {job.skills.split(',').slice(0, 5).map((skill, index) => (
          <Chip
          key={index}
          label={skill.trim()}
          size="small"
          sx={{
            backgroundColor: hoveredCard === job.id
            ? 'rgba(57, 255, 20, 0.15)'
            : 'rgba(255, 255, 255, 0.05)',
                                                                  color: hoveredCard === job.id ? 'primary.light' : 'text.secondary',
                                                                  borderColor: hoveredCard === job.id ? 'primary.main' : 'transparent',
                                                                  border: '1px solid',
                                                                  transition: 'all 0.3s ease',
                                                                  fontWeight: 500,
                                                                  fontSize: '0.75rem',
          }}
          />
        ))}
        {job.skills.split(',').length > 5 && (
          <Chip
          label={`+${job.skills.split(',').length - 5}`}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                              color: 'text.secondary',
                                              fontWeight: 500,
                                              fontSize: '0.75rem',
          }}
          />
        )}
        </Box>
      )}
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
      <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
      <Button
      variant="outlined"
      sx={{
        flex: 1,
        py: 1.25,
        fontSize: '0.875rem',
        fontWeight: 600,
        borderColor: 'rgba(255, 255, 255, 0.2)',
                               color: 'text.primary',
                               '&:hover': {
                                 borderColor: 'primary.main',
                                 backgroundColor: 'rgba(57, 255, 20, 0.05)',
                               },
      }}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/apply/${job.id}`);
      }}
      >
      View Details
      </Button>
      <Button
      variant="contained"
      endIcon={
        <ArrowForward
        sx={{
          transform: hoveredCard === job.id ? 'translateX(4px)' : 'translateX(0)',
                               transition: 'transform 0.3s ease',
        }}
        />
      }
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/apply/${job.id}`);
      }}
      sx={{
        flex: 1,
        py: 1.25,
        fontSize: '0.875rem',
        fontWeight: 600,
      }}
      >
      Apply Now
      </Button>
      </Box>
      </CardActions>
      </Card>
      </Zoom>
      </Grid>
    ))}
    </Grid>
    </Box>

    {jobs.length === 0 && (
      <Fade in timeout={600}>
      <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        py: 8,
        px: 4,
        mt: 4,
        background: 'linear-gradient(145deg, #1A1A1A, #151515)',
                           borderRadius: 4,
                           maxWidth: 800,
                           mx: 'auto',
                           border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      >
      <Box
      component="img"
      src="https://illustrations.popsy.co/purple/taking-notes.svg"
      alt="No positions"
      sx={{
        width: '200px',
        height: '200px',
        mb: 4,
        opacity: 0.8,
        filter: 'brightness(1.2)',
      }}
      />
      <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontWeight: 700,
        background: 'linear-gradient(45deg, #39FF14, #14FFE5)',
                           WebkitBackgroundClip: 'text',
                           WebkitTextFillColor: 'transparent',
      }}
      >
      No Active Listings Right Now
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
      The DevGeeks community is cooking up some amazing opportunities!
      </Typography>
      <Box
      sx={{
        p: 3,
        background: 'linear-gradient(145deg, rgba(57, 255, 20, 0.08), rgba(20, 255, 229, 0.08))',
                           border: '1px solid',
                           borderColor: 'primary.main',
                           borderRadius: 2,
                           maxWidth: 600,
                           mx: 'auto',
                           mt: 3,
      }}
      >
      <Typography
      variant="h6"
      gutterBottom
      sx={{ fontStyle: 'italic', color: 'primary.light' }}
      >
      "The best way to predict the future is to create it."
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, color: 'text.secondary' }}>
      — DevGeeks Motto
      </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 4, color: 'text.secondary' }}>
      Join our community and be the first to know when new positions are posted!
      </Typography>
      </Paper>
      </Fade>
    )}
    </Box>
  );
};

export default JobList;
