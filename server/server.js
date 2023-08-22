const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // for parsing application/json

const users = [
    {
        username: 'Rowan',
        birthdate: '04-12-1998',
        age: 24,
        email: 'rowan@gmail.com',
        password: 'rowan123',
        valid: false,
    },
    {
        username: 'Joseph',
        birthdate: '31-01-1998',
        age: 25,
        email: 'joseph@gmail.com',
        password: 'joseph123',
        valid: false,
    },
    {
        username: 'Zac',
        birthdate: '30-07-1996',
        age: 27,
        email: 'zac@gmail.com',
        password: 'zac123',
        valid: false,
    }
];

app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        user.valid = true;
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



