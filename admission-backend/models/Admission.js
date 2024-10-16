const db = require('../config/db');

// Function to create a new admission entry in the database
const createAdmission = (firstName, lastName, email, phone, course, address, callback) => {
  const query = `
    INSERT INTO admissions (firstName, lastName, email, phone, course, address)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [firstName, lastName, email, phone, course, address];
  
  db.run(query, params, function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID });
    }
  });
};

module.exports = {
  createAdmission
};
