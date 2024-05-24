const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/users')

app.use(express.json());
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.send('HHH');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}` )
})