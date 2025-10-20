const express = require('express');
const admin = require('../firebaseAdmin');

const db = admin.firestore();
const router = express.Router();

// Create a new post
router.post('/', async (req, res) => {
  try {
    const post = req.body;
    const docRef = await db.collection('posts').add(post);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    console.error('Error adding document: ', error);
    res.status(500).send('Error adding document');
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('posts').get();
    const posts = [];
    snapshot.forEach(doc => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting documents: ', error);
    res.status(500).send('Error getting documents');
  }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('posts').doc(req.params.id).get();
    if (!doc.exists) {
      res.status(404).send('No such document!');
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    res.status(500).send('Error getting document');
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    await db.collection('posts').doc(req.params.id).update(req.body);
    res.status(200).send('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
    res.status(500).send('Error updating document');
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('posts').doc(req.params.id).delete();
    res.status(200).send('Document successfully deleted!');
  } catch (error) {
    console.error('Error removing document: ', error);
    res.status(500).send('Error removing document');
  }
});

module.exports = router;
