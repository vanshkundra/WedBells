const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use SMTP if needed
    auth: {
      user: 'vanshkundraofficial@gmail.com', // Replace with your email
      pass: 'jyau hrpc auzt xjkf' // Replace with your app password
    }
  });

  const mailOptions = {
    from: 'WedBells <vanshkundraofficial@gmail.com>',
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
