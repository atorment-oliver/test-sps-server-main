const express = require('express');
const bodyParser = require('body-parser');
const { isAuthenticated } = require('./middleware');
const { generateToken } = require('./auth');
const { getUsers, createUser, updateUser, deleteUser } = require('./users');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    const user = getUsers().find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
});

app.get('/users', isAuthenticated, (req, res) => {
    res.json(getUsers());
});
app.get('/users/:id', isAuthenticated, (req, res) => {
  const userId = req.params.id;
  const user = getUsers().find(u => u.id === parseInt(userId));

  if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json(user);
});
app.post('/users', isAuthenticated, (req, res) => {
    const { name, email, type, password } = req.body;
    const newUser = createUser(name, email, type, password);

    if (newUser.error) {
        return res.status(400).json({ message: newUser.error });
    }

    res.status(201).json(newUser);
});

app.put('/users/:id', isAuthenticated, (req, res) => {
    const { name, email, type, password } = req.body;
    const updatedUser = updateUser(req.params.id, name, email, type, password);

    if (updatedUser.error) {
        return res.status(400).json({ message: updatedUser.error });
    }

    res.json(updatedUser);
});

app.delete('/users/:id', isAuthenticated, (req, res) => {
    const result = deleteUser(parseInt(req.params.id));

    if (result.error) {
        return res.status(400).json({ message: result.error });
    }

    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
