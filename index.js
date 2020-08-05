const express = require('express');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

express.urlencoded({ extended: true });
express.json();

app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/', (req, res, next) => {
    res.status(404).send('Error 404. Page Not found');
})

app.listen(PORT, console.log(`App Running on Port ${PORT}`));