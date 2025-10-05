
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Divider,
  Chip,
  IconButton,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Description,
  Email,
  Phone,
  ArrowBack,
  PersonOutline,
} from '@mui/icons-material';

const ApplicationCard = ({ application, isShortlisted }) => (
  <Card sx={{ mb: 2, borderLeft: isShortlisted ? 6 : 0, borderColor: 'success.main' }}>
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonOutline sx={{ mr: 1 }} />
            <Typography variant="h6">{application.name}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ mr: 1, fontSize: '0.9rem' }} />
            <Typography variant="body2">{application.email}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Phone sx={{ mr: 1, fontSize: '0.9rem' }} />
            <Typography variant="body2">{application.phone}</Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            About
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {application.about}
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<Description />}
            size="small"
            href={`http://localhost:5000/${application.resume}`}
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const ViewApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsRes, jobRes] = await Promise.all([
          axios.get(`/api/admin/postings/${id}/applications`),
          axios.get(`/api/postings/${id}`)
        ]);
        setApplications(applicationsRes.data);
        setJob(jobRes.data);
      } catch (error) {
        setError('Error loading applications');
      }
    };
    fetchData();
  }, [id]);

  const handleShortlist = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/admin/postings/${id}/shortlist`, { count });
      setShortlisted(data);
      setError('');
    } catch (error) {
      setError('Error shortlisting applications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/admin/dashboard')}
          sx={{ mb: 3 }}
        >
          Back to Dashboard
        </Button>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Applications for {job?.title || 'Position'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
            <TextField
              type="number"
              label="Number of candidates to shortlist"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              size="small"
              sx={{ width: 200 }}
              inputProps={{ min: 1, max: applications.length }}
            />
            <Button
              variant="contained"
              onClick={handleShortlist}
              disabled={loading || applications.length === 0}
            >
              {loading ? <CircularProgress size={24} /> : 'Shortlist Candidates'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Total Applications: {applications.length}
          </Typography>
        </Paper>

        {shortlisted.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Shortlisted Applications
            </Typography>
            <Box sx={{ mb: 4 }}>
              {shortlisted.map((application) => (
                <ApplicationCard 
                  key={application.id} 
                  application={application}
                  isShortlisted={true}
                />
              ))}
            </Box>
            <Divider sx={{ mb: 4 }} />
          </Box>
        )}

        <Typography variant="h5" gutterBottom>
          All Applications
        </Typography>
        {applications.map((application) => (
          <ApplicationCard 
            key={application.id} 
            application={application}
            isShortlisted={shortlisted.some(s => s.id === application.id)}
          />
        ))}

        {applications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No applications received yet.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ViewApplications;
