
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { pool, createTables } = require('./db');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });



const bcrypt = require('bcrypt');

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/admin/postings', async (req, res) => {
  const { title, description, company, location, type, requirements, skills, salary } = req.body;
  const skillsString = skills;

  try {
    const result = await pool.query(
      'INSERT INTO postings (title, description, company_name, location, type, requirements, skills, stipend) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, company, location, type, requirements, skillsString, salary]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/api/admin/postings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM postings WHERE id = $1', [id]);
    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/postings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM postings ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add endpoint to fetch a single job posting
app.get('/api/postings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM postings WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/postings/:id/apply', upload.single('resume'), async (req, res) => {
  const { id } = req.params;
  const { email, phone, name, about } = req.body;
  const resume = req.file.path;

  try {
    const emailCheck = await pool.query('SELECT * FROM applications WHERE posting_id = $1 AND email = $2', [id, email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'You have already applied for this position with this email address.' });
    }

    const phoneCheck = await pool.query('SELECT * FROM applications WHERE posting_id = $1 AND phone = $2', [id, phone]);
    if (phoneCheck.rows.length > 0) {
      return res.status(400).json({ error: 'You have already applied for this position with this phone number.' });
    }

    const result = await pool.query('INSERT INTO applications (posting_id, email, phone, name, about, resume) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, email, phone, name, about, resume]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/admin/postings/:id/applications', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM applications WHERE posting_id = $1 ORDER BY created_at DESC', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const shortlistResumes = require('./shortlist');

app.post('/api/admin/postings/:id/shortlist', async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    const applicationsResult = await pool.query('SELECT * FROM applications WHERE posting_id = $1', [id]);
    const applications = applicationsResult.rows;

    const postingResult = await pool.query('SELECT * FROM postings WHERE id = $1', [id]);
    const posting = postingResult.rows[0];

    const shortlisted = await shortlistResumes(applications, posting.description, count, process.env.GEMINI_API_KEY);

    res.json(shortlisted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});








app.use('/uploads', express.static('uploads'));

const startServer = async () => {
  await createTables();
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

startServer();

