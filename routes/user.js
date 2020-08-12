const express = require('express');
const expHbs = require('express-handlebars');
const db = require('../util/database');
const sendMail = require('../util/mail');


const router = express.Router();

router.get('/find', (req, res, next) => {
    res.render('find', { title: 'Blood Bank' });
});
router.post('/find', (req, res, next) => {
    console.log('Post Find');
    db.execute('select * from data where type=?', [req.body.type])
        .then(rows => {
            rows = rows[0];
            console.table(rows);
            res.render('find-view', { title: 'Blood Bank Query', data: rows });
        })
        .catch(err => {
            console.log(`Following Error has occured: ${err}`);
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