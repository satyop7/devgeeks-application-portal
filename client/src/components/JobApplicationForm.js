
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Snackbar,
} from '@mui/material';
import { CloudUpload, ArrowBack } from '@mui/icons-material';

const JobApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    about: '',
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/postings/${id}`);
        setJob(data);
        setError('');
      } catch (error) {
        if (error.response?.status === 404) {
          setError('Job posting not found. This position might have been filled or removed.');
        } else {
          setError('Error loading job details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const formPayload = new FormData();
    Object.keys(formData).forEach(key => {
      formPayload.append(key, formData[key]);
    });
    if (resume) {
      formPayload.append('resume', resume);
    }

    try {
      await axios.post(`/api/postings/${id}/apply`, formPayload);
      setSuccess('Application submitted successfully!');
      setError('');
      // Clear form after successful submission
      setFormData({
        email: '',
        phone: '',
        name: '',
        about: '',
      });
      setResume(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Error submitting application');
      setSuccess('');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
          <CircularProgress size={40} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading job details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Job posting not found'}
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            variant="contained"
          >
            Back to Jobs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Jobs
        </Button>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Apply for {job?.title || 'Position'}
          </Typography>

          {job?.description && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              {job.description}
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Snackbar
            open={!!success}
            autoHideDuration={6000}
            onClose={() => setSuccess('')}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              {success}
            </Alert>
          </Snackbar>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              fullWidth
              label="About Yourself"
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              margin="normal"
              multiline
              rows={4}
              placeholder="Tell us about your relevant experience and why you're a good fit for this position"
            />

            <Box
              sx={{
                mt: 3,
                p: 2,
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              <input
                accept=".pdf"
                style={{ display: 'none' }}
                id="resume-file"
                type="file"
                onChange={(e) => setResume(e.target.files[0])}
              />
              <label htmlFor="resume-file">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Upload Resume (PDF)
                </Button>
              </label>
              {resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {resume.name}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={submitLoading || !resume}
              sx={{ mt: 4 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ mr: 1 }} />
              ) : 'Submit Application'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default JobApplicationForm;
