"use strict"
// var nodemailer = require('nodemailer');
let email = document.getElementById("emailAddress");
let topic = document.getElementById("topicSelect");
let message = document.getElementById("taMessage");
let emailVal;
let topicVal;
let messageVal;
window.onload = init;

function init() {

document.getElementById("emailForm").onsubmit = handleSubmission;

    jQuery.validator.addMethod("emailCheck",function (value) {
        let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test(value);
    },"invalid email");
}
function handleSubmission(event) {
    let isValid = $("#emailForm").validate
    (
        {
            rules:
                {
                    emailAddress:
                        {
                            required: true,
                            emailCheck: true
                        },
                    topicSelect:
                        {
                            required: true,
                        },
                    taMessage:
                        {
                            required: true
                        }
                },
            messages:
                {
                    fullName:
                        {
                            emailCheck: "enter a valid email address"
                        }
                }
        });

    if(isValid.valid())
    {
        emailVal = email.value;
        topicVal = topic.value;
        messageVal = message.value;
        // sendEmail();
        console.log("Success")
    }
    else {
        console.log("Fail")
    }
    event.preventDefault();
}
function sendEmail() {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'qchoumont@gmail.com',
            pass: 'yourpassword'
        }
    });

    var mailOptions = {
        from: emailVal,
        to: 'qchoumont@gmail.com',
        subject: topicVal,
        text: messageVal
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}