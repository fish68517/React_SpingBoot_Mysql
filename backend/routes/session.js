const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

// Exchange an ID token (from client Firebase SDK) for a long-lived session cookie.
router.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).send('Missing idToken');

    // Set session expiration to 5 days (in milliseconds)
    const expiresIn = 5 * 24 * 60 * 60 * 1000;

    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    // Return the cookie value in the response body so clients (mobile) can store it
    res.status(200).json({ sessionCookie });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    res.status(401).send('Failed to create session cookie');
  }
});

// Verify a session cookie
router.post('/verify', async (req, res) => {
  try {
    const { sessionCookie } = req.body;
    if (!sessionCookie) return res.status(400).send('Missing sessionCookie');

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, /* checkRevoked */ true);
    res.status(200).json({ valid: true, uid: decodedClaims.uid });
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    res.status(401).json({ valid: false });
  }
});

// Logout / revoke refresh tokens for the user represented by the session cookie
router.post('/logout', async (req, res) => {
  try {
    const { sessionCookie } = req.body;
    if (!sessionCookie) return res.status(400).send('Missing sessionCookie');

    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
    // Revoke refresh tokens to force logout
    await admin.auth().revokeRefreshTokens(decodedClaims.sub || decodedClaims.uid);
    res.status(200).send('Logged out');
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(400).send('Failed to logout');
  }
});

module.exports = router;
