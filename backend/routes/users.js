const express = require('express');
const admin = require('../firebaseAdmin');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).send('Error creating new user');
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // This is a simplified example. In a real application, you would
    // want to use Firebase Authentication on the client-side to sign in the
    // user and then send the ID token to the server to verify.
    const user = await admin.auth().getUserByEmail(email);
    // Note: This doesn't actually verify the password. 
    // Real password verification should be done on the client-side with Firebase SDK.
    res.status(200).send({ uid: user.uid }); 
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).send('Login failed');
  }
});

module.exports = router;
