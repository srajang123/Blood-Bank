const express = require('express');
const db = require('../util/database');
const sendMail = require('../util/mail');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('hello Admin. home page');
})
router.get('/add', (req, res, next) => {
    res.send('Add data Page Here');
});
router.post('/add', (req, res, next) => {
    const { email, name, age, type, mobile, address } = req.body;
    db.execute('insert into data values(?,?,?,?,?,?)', [email, name, age, type, mobile, address])
        .then(ret => {
            res.send('Data Added successfully');
        })
        .catch(err => console.log(`Error ocured: ${err}`));
});
router.get('/view', (req, res, next) => {
    db.execute('select * from data')
        .then(rows => {
            rows = rows[0];
            console.table(rows);
        })
        .catch(err => {
            console.log(`Error occurred: ${err}`);
        })
});
router.get('/remove/:mail', (req, res, next) => {
    const mail = req.params.mail;
    db.execute('delete from data where mail=?', [mail])
        .then(ret => {
            res.send(`${mail} removed successfully.`);
        })
        .catch(err => {
            console.log(`Error occured: ${err}`);
        })
});

module.exports = router;