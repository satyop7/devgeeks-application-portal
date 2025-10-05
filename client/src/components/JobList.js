
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Skeleton,
  Chip,
  Paper,
} from '@mui/material';
import { Work, AccessTime, LocationOn } from '@mui/icons-material';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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
            <Card>
              <CardContent>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={100} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Available Positions
      </Typography>

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {job.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.location || 'Remote'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                  <Work fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {job.type || 'Full-time'}
                  </Typography>
                </Box>

                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {job.description}
                </Typography>

                {job.skills && (
                  <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.skills.split(',').map((skill, index) => (
                      <Chip 
                        key={index}
                        label={skill.trim()}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => navigate(`/apply/${job.id}`)}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {jobs.length === 0 && (
        <Paper
          elevation={3}
          sx={{
            textAlign: 'center',
            py: 8,
            px: 4,
            mt: 4,
            backgroundColor: 'background.paper',
            borderRadius: 4,
            maxWidth: 800,
            mx: 'auto'
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
              opacity: 0.9
            }}
          />
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #39FF14, #14FFE5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            No Active Listings Right Now
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            The DevGeeks community is cooking up some amazing opportunities!
          </Typography>
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, rgba(57, 255, 20, 0.1), rgba(20, 255, 229, 0.1))',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              maxWidth: 600,
              mx: 'auto',
              mt: 2
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontStyle: 'italic', color: 'primary.light' }}>
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
      )}
    </Box>
  );
};

export default JobList;
