const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const addQuestionsRouter = require('./Add_questions');
const questionsRouter = require('./questionsAPI');
const userAnswers = require('./userAnswersAPI');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eotc_database',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('User table and MySQL are connected');
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profile_pictures/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Use the addQuestionsRouter for questions endpoint
app.use('/api', addQuestionsRouter);
app.use('/api', questionsRouter);
app.use('/api', userAnswers);

// Register endpoint with email existence check and password hashing
app.post('/register', upload.single('profile_image'), async (req, res) => {
  const { first_name, last_name, email, age, username, password, gender, marital_status } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  try {
    const emailCheckSql = 'SELECT * FROM users WHERE email = ?';
    connection.query(emailCheckSql, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email existence:', err);
        res.status(500).json({ message: 'An error occurred while checking email existence' });
        return;
      }

      if (results.length > 0) {
        res.status(400).json({ message: 'Email already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = 'INSERT INTO users (first_name, last_name, email, age, username, password, gender, marital_status, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [first_name, last_name, email, age, username, hashedPassword, gender, marital_status, profileImage], (err, result) => {
        if (err) {
          console.error('Error registering user:', err);
          res.status(500).json({ message: 'An error occurred while registering' });
          return;
        }
        res.status(200).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], async (err, results) => {
      if (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ message: 'An error occurred while retrieving user' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid username' });
        return;
      }

      const user = results[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(401).json({ message: 'Password not matching' });
        return;
      }

      res.status(200).json({ message: 'Login successful', userId: user.id, username: user.username });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// Forgot password endpoint
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const emailCheckSql = 'SELECT * FROM users WHERE email = ?';
    connection.query(emailCheckSql, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email existence:', err);
        res.status(500).json({ message: 'An error occurred while checking email existence' });
        return;
      }

      if (results.length === 0) {
        res.status(400).json({ message: 'Email does not exist' });
        return;
      }

      const temporaryPassword = crypto.randomBytes(4).toString('hex');
      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

      const updatePasswordSql = 'UPDATE users SET password = ? WHERE email = ?';
      connection.query(updatePasswordSql, [hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Error updating password:', err);
          res.status(500).json({ message: 'An error occurred while updating password' });
          return;
        }

        console.log(`Temporary password for ${email} is ${temporaryPassword}`);
        res.status(200).json({ message: 'Temporary password has been sent to your email' });
      });
    });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'An error occurred during password reset' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
