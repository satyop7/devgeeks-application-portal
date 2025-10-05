
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import AdminLogin from '../components/AdminLogin';

const AdminPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 500,
            color: 'primary.main',
          }}
        >
          Admin Portal
        </Typography>
        <AdminLogin />
      </Box>
    </Container>
  );
};

export default AdminPage;
