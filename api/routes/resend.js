var express = require('express');
var resend = require('resend');
require('dotenv').config();

var router = express.Router();
var resendManager = new resend.Resend(process.env.RESEND_API);

//Send ticket mail to "tigrana334@gmail.com"
router.post('/new-ticket', function(req, res, next) {
    const {name, mail, message} = req.body;

    const {data, error} = resendManager.emails.send({
        from: "gomank34@gmail.com",
        to: "tigrana334@gmail.com",
        subject: "New Ticket Recieved!",
        html: "<p>Email Sent</p>"
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

    if(error){
        console.error(error);
    }

    res.send(data);
});

module.exports = router;