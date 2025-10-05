require('dotenv').config({ path: 'F:/VibeCodedWebsites/resume-shortlister - Copy/server/.env' });
const { pool } = require('./db');

const alterTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      ALTER TABLE postings
      ADD COLUMN IF NOT EXISTS company_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS location VARCHAR(255),
      ADD COLUMN IF NOT EXISTS stipend VARCHAR(255),
      ADD COLUMN IF NOT EXISTS requirements TEXT,
      ADD COLUMN IF NOT EXISTS skills TEXT,
      ADD COLUMN IF NOT EXISTS type VARCHAR(255);
    `);
    console.log('Tables altered successfully');
  } catch (error) {
    console.error('Error altering tables:', error);
  } finally {
    client.release();
    pool.end();
  }
};

alterTables();