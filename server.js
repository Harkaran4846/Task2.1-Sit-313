const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harkaran687@gmail.com', 
    pass: 'yuhourdgsxgyqeik', 
  },
});

async function sendMail(to, subject, message) {
  const mailOptions = {
    from: 'harkaran687@gmail.com', 
    to: to,
    subject: subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
app.post('/signup', async (req, res) => {
  const email = req.body.email;
  console.log(`Received email from : ${email}`);

  if (!email) {
    console.error('No email provided');
    return res.status(400).send('Email is required');
  }

  try {
    const emailSent = await sendMail(
      email,
      "Enter your mail for signUp",
      
    );

    if (emailSent) {
      res.send(`<h2>Thanks for signing up, ${email}</h2><p>Email sent</p>`);
    } else {
      res.status(500).send("There is error to sending email");
    }
  } catch (error) {
    console.error('Error in signup :', error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
