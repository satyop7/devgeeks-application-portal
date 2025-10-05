
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [postings, setPostings] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, postingId: null });
  const [error, setError] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    try {
      const { data } = await axios.get('/api/postings');
      setPostings(data);
    } catch (error) {
      setError('Error fetching job postings');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/postings/${deleteDialog.postingId}`);
      setPostings(postings.filter((p) => p.id !== deleteDialog.postingId));
      setDeleteDialog({ open: false, postingId: null });
    } catch (error) {
      setError('Error deleting job posting');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #39FF14, #14FFE5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Manage Internship Postings
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/create-posting')}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Create New Posting
          </Button>
        </Box>
      </Fade>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {postings.map((posting, index) => (
          <Grid item xs={12} sm={6} lg={4} key={posting.id}>
            <Zoom in timeout={400 + index * 100}>
              <Card
                onMouseEnter={() => setHoveredCard(posting.id)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: hoveredCard === posting.id ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: hoveredCard === posting.id
                    ? '0 12px 40px rgba(57, 255, 20, 0.25)'
                    : '0 4px 12px rgba(0, 0, 0, 0.5)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #39FF14, #14FFE5)',
                    opacity: hoveredCard === posting.id ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: hoveredCard === posting.id ? 'primary.light' : 'text.primary',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {posting.title}
                  </Typography>
                
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    <BusinessIcon
                      sx={{
                        fontSize: 18,
                        color: hoveredCard === posting.id ? 'primary.main' : 'text.secondary',
                        transition: 'color 0.3s ease',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {posting.company_name || 'Company Name'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    <LocationIcon
                      sx={{
                        fontSize: 18,
                        color: hoveredCard === posting.id ? 'primary.main' : 'text.secondary',
                        transition: 'color 0.3s ease',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {posting.location || 'Location'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <WorkIcon
                      sx={{
                        fontSize: 18,
                        color: hoveredCard === posting.id ? 'secondary.main' : 'text.secondary',
                        transition: 'color 0.3s ease',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {posting.type || 'Full-time'}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.6,
                    }}
                  >
                    {posting.description}
                  </Typography>

                {posting.skills && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {posting.skills.split(',').map((skill) => (
                      <Chip
                        key={skill}
                        label={skill.trim()}
                        size="small"
                        sx={{ backgroundColor: 'primary.main', color: 'white' }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/admin/postings/${posting.id}/applications`)}
                    sx={{ flex: 1 }}
                  >
                    View Applications
                  </Button>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteDialog({ open: true, postingId: posting.id });
                    }}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, postingId: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this internship posting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, postingId: null })}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
