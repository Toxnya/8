const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: 'Майк Эрмантраут', email: 'mikeerr@example.com', age: 60 },
    { id: 2, name: 'Сэмюэл Джексон', email: 'samjack@example.com', age: 75 },
    { id: 3, name: 'Кенни Маккормик', email: 'kenny@example.com', age: 10 },
];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/', (req, res) => {
    const { id, name, email, age } = req.body;
    if (id && name && email && age) {
        users.push({ id, name, email, age });
        res.status(201).send('User added');
    } else {
        res.status(400).send('Invalid data');
    }
});

router.put('/:id', (req, res) => {
    const { name, email, age } = req.body;
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        if (name) user.name = name;
        if (email) user.email = email;
        if (age) user.age = age;
        res.send('User updated');
    } else {
        res.status(404).send('User not found');
    }
});

router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        res.send('User deleted');
    } else {
        res.status(404).send('User not found');
    }
});

router.get('/age/:age', (req, res) => {
    const age = parseInt(req.params.age);
    const filteredUsers = users.filter(u => u.age > age);
    res.json(filteredUsers);
});

router.get('/domain/:domain', (req, res) => {
    const domain = req.params.domain;
    const filteredUsers = users.filter(u => u.email.endsWith(`@${domain}`));
    res.json(filteredUsers);
});

router.get('/sorted', (req, res) => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedUsers);
});

module.exports = router;