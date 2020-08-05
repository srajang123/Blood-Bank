const express = require('express');
const db = require('../util/database');
const sendMail = require('../util/mail');
const router = express.Router();

router.get('/find', (req, res, next) => {
    res.send('Welcome to find');
});
router.post('/find', (req, res, next) => {
    db.execute('select * from data where type=?', [req.body.type])
        .then(rows => {
            rows = rows[0];
            console.table(rows);
        })
        .catch(err => {
            console.log(`Folloing Error has occured: ${err}`);
        })
});
router.get('/contact/:usr', (req, res, next) => {
    res.send('Send mail to ' + req.params.usr);
});
router.post('/contact', (req, res, next) => {
    const { to, body } = req.body;
    sendMail(to, 'Contacting for Blood', body);
    res.redirect('/done');
})
router.get('/done', (req, res, next) => {
    res.send('Mail sent successfully.');
})
module.exports = router;