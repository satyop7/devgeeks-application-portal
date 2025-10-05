
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './components/AdminDashboard';
import CreateJobPosting from './components/CreateJobPosting';
import JobApplicationForm from './components/JobApplicationForm';
import ViewApplications from './components/ViewApplications';
import Layout from './components/Layout';
import theme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-posting" element={<CreateJobPosting />} />
            <Route path="/apply/:id" element={<JobApplicationForm />} />
            <Route path="/admin/postings/:id/applications" element={<ViewApplications />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
