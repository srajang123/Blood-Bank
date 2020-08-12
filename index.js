const express = require('express');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/', (req, res, next) => {
    res.status(404).send('Error 404. Page Not found');
})

app.listen(PORT, console.log(`App Running on Port ${PORT}`));