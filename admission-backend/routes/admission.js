const express = require('express');
const router = express.Router();
const { createAdmission } = require('../models/Admission');

// POST route to submit an admission form
router.post('/submit-admission', (req, res) => {
  const { firstName, lastName, email, phone, course, address } = req.body;

  // Call createAdmission to store the form data in the SQLite database
  createAdmission(firstName, lastName, email, phone, course, address, (err, result) => {
    if (err) {
      console.error('Error saving admission data:', err);
      return res.status(500).json({ message: 'Failed to submit admission.' });
    }

    res.status(201).json({ message: 'Admission submitted successfully!', admissionId: result.id });
  });
});

module.exports = router;
