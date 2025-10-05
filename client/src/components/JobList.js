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
  CheckCircleOutline,
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
      <Grid container spacing={3}>
        {[1, 2, 3].map((n) => (
          <Grid item xs={12} md={6} lg={4} key={n}>
            <Card sx={{ height: 450 }}>
              <CardContent>
                <Skeleton variant="rectangular" height={30} sx={{ mb: 2, borderRadius: 1 }} />
                <Skeleton variant="text" height={20} width="60%" sx={{ mb: 2 }} />
                <Skeleton variant="text" height={20} width="50%" sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={100} sx={{ mb: 2, borderRadius: 1 }} />
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

      <Grid container spacing={3}>
        {jobs.map((job, index) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Zoom in timeout={300 + index * 100}>
              <Card
                onMouseEnter={() => setHoveredCard(job.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'visible',
                  transform: hoveredCard === job.id ? 'translateY(-8px)' : 'translateY(0)',
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
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        color: hoveredCard === job.id ? 'primary.light' : 'text.primary',
                        transition: 'color 0.3s ease',
                        flex: 1,
                      }}
                    >
                      {job.title}
                    </Typography>
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

                  <Box sx={{ mb: 2.5 }}>
                    {job.company && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                        <Business
                          fontSize="small"
                          sx={{
                            color: hoveredCard === job.id ? 'primary.main' : 'text.secondary',
                            transition: 'color 0.3s ease',
                          }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {job.company}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                      <LocationOn
                        fontSize="small"
                        sx={{
                          color: hoveredCard === job.id ? 'primary.main' : 'text.secondary',
                          transition: 'color 0.3s ease',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {job.location || 'Remote'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Work
                        fontSize="small"
                        sx={{
                          color: hoveredCard === job.id ? 'secondary.main' : 'text.secondary',
                          transition: 'color 0.3s ease',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {job.type || 'Full-time'}
                      </Typography>
                    </Box>
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
                    <Box sx={{ mb: 2.5 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: 'text.secondary',
                          fontWeight: 600,
                          mb: 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        <CheckCircleOutline sx={{ fontSize: 14 }} />
                        Key Requirements
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.5,
                          fontSize: '0.85rem',
                        }}
                      >
                        {job.requirements}
                      </Typography>
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
                  <Button
                    variant="contained"
                    fullWidth
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
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

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
