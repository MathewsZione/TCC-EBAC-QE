const express = require('express');
const app = express();

app.use(express.json());

app.get('/endpoint', (req, res) => {
  res.json({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
});

module.exports = app;
