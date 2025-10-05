
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          Manage Internship Postings
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/create-posting')}
        >
          Create New Posting
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {postings.map((posting) => (
          <Grid item xs={12} md={6} lg={4} key={posting.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {posting.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {posting.company || 'Company Name'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {posting.location || 'Location'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 1, fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {posting.type || 'Full-time'}
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
                  }}
                >
                  {posting.description}
                </Typography>

                {posting.skills && posting.skills.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {posting.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ backgroundColor: 'primary.main', color: 'white' }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/admin/postings/${posting.id}/applications`)}
                >
                  View Applications
                </Button>
                <IconButton
                  color="error"
                  onClick={() => setDeleteDialog({ open: true, postingId: posting.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
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
