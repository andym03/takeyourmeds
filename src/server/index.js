/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
require('dotenv').config();
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

const options = {
  keepAlive: true,
  connectTimeoutMS: 60000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const client = new MongoClient(process.env.DB_URI, { ...options });

client.connect(() => {
  console.log('Connected successfully to server');
});

async function newAddEmailToDB(document) {
  console.log('Attempting to add to db');
  const result = await client.db('takeyourmeds').collection('notifications').insertOne(document);

  if (result) {
    console.log(`Added '${JSON.stringify(document)}':`);
  } else {
    console.log('Failed to add to the DB');
  }
}

const weekday = new Array(7);
weekday[0] = 'sunday';
weekday[1] = 'monday';
weekday[2] = 'tuesday';
weekday[3] = 'wednesday';
weekday[4] = 'thursday';
weekday[5] = 'friday';
weekday[6] = 'saturday';

const FIVE_MIN = 5 * 60 * 1000;

const newBuildTodaysEmailList = async () => {
  const today = new Date().getDay();
  try {
    console.log('ATTEMPT QUERY FOR EMAILS ');
    // await client.connect(async () => {
    const collection = client.db('takeyourmeds').collection('notifications');
    // perform actions on the collection object
    collection
      .find({
        emailConfirmed: true,
        $or: [{ frequency: 'Daily' }, { frequency: weekday[today] }]
      })
      .project({
        email: 1, notificationTime: 1
      })
      .toArray(async (err, items) => {
        if (err) {
          console.log(`WE HIT ERROR${err}`);
          throw err;
        }
        console.log(items);
        console.log('Please try and send mail');
        await sendEmails(items);
      });
    // });
  } catch (error) {
    console.log(error);
  }
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'takeyourmeds.bit@gmail.com', // generated ethereal user
    pass: 'Winston22!!22' // generated ethereal password
  }
});

const sendMail = async (emailAddresses) => {
  console.log(emailAddresses);
  if (emailAddresses.length > 0) {
  // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Take Your Meds 💊" <takeyourmeds.bit@gmail.com>', // sender address
      to: emailAddresses.toString(), // list of receivers
      subject: 'Take Your Meds', // Subject line
      text: "Hey friend! It's time to take your meds 😊", // plain text body
      html: '<b>gang gang</b>' // html body
    });
    return info;
  }
  return 'failed';
};

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const addToDB = async (document) => {
  try {
    client.connect(() => {
      client.db('takeyourmeds').collection('notifications')
        .insertOne(document);
      client.close();
    });
    console.log(`Added ${document} to email list`);
  } catch (error) {
    console.log(error);
  }
};

// Run every minute
const sendEmails = async (todaysEmails) => {
  console.log(`Current Emails = ${JSON.stringify(todaysEmails)}`);
  if (todaysEmails) {
    try {
      const now = new Date();
      const emailsToSend = [];
      todaysEmails.forEach((item) => {
        // console.log(JSON.stringify(item));
        if (now.getHours() === item.notificationTime.hours
        && now.getMinutes() === item.notificationTime.minutes) {
          emailsToSend.push(item.email);
        }
      });
      sendMail(emailsToSend);
    } catch (error) {
      console.log(error);
    }
  }
};

const buildTodaysEmailList = async () => {
  const today = new Date().getDay();
  try {
    console.log('ATTEMPT QUERY FOR EMAILS ');
    await client.connect(async () => {
      const collection = client.db('takeyourmeds').collection('notifications');
      // perform actions on the collection object
      collection
        .find({
          emailConfirmed: true,
          $or: [{ frequency: 'Daily' }, { frequency: weekday[today] }]
        })
        .project({
          email: 1, notificationTime: 1
        })
        .toArray(async (err, items) => {
          if (err) {
            console.log(`WE HIT ERROR${err}`);
            throw err;
          }
          console.log('Please try and send mail');
          await sendEmails(items);
          client.close();
        });
    });
  } catch (error) {
    console.log(error);
  }
};

app.post('/api/setMedReminder', async (req, res) => {
  const docToInsert = {
    email: req.body.email,
    medicationName: req.body.medicationName,
    frequency: req.body.frequency,
    notificationTime: req.body.notificationTime,
    emailConfirmed: false,

  };
  newAddEmailToDB(docToInsert);
  res.end('yes');
});

app.post('/api/setMedReminder', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8081, () => console.log(`Listening on port ${process.env.PORT || 8081}!`));


const minutes = 1;
const theInterval = minutes * 60 * 1000;
setInterval(async () => {
  console.log('Building Email List and sending');
  await newBuildTodaysEmailList();
  console.log('Built Email List and sending');
  // do your stuff here
}, theInterval);
