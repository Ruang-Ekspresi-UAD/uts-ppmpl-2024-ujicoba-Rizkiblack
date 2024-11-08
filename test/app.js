const express = require('express');
const app = express();
app.use(express.json());

const users = [{ id: 1, name: 'John Doe' }];

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.status(200).json(user);
});

module.exports = app;
