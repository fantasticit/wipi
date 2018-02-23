const koa = require('koa')
const app = new koa()
const port = require('./config').port
const db = require('./mongodb/db')
const middleWare = require('./middleware')
const router = require('./router')

middleWare(app)
router(app)



const nodemailer = require('nodemailer')

// let account = 'bken2016@163.com'
// // Generate SMTP service account from ethereal.email
// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//       console.error('Failed to create a testing account');
//       console.error(err);
//       return process.exit(1);
//   }

//   console.log('Credentials obtained, sending message...');

//   // NB! Store the account object values somewhere if you want
//   // to re-use the same account for future mail deliveries

  
// });
// // Create a SMTP transporter object
// let transporter = nodemailer.createTransport(
//   {
//     host: 'smtp.163.com',
//     port: 465,
//     // secure: true, // use TLS
//     auth: {
//       user: 'bken2016@163.com',
//       pass: 'ben123456'
//     },
//     logger: false,
//     debug: false // include SMTP traffic in the logs
//   }
// );

// // Message object
// let message = {
//   from: '<bken2016@163.com>',
//   // Comma separated list of recipients
//   to: '"zhaoxu" <zhaoxu@rawstonedu.com>',

//   // Subject of the message
//   subject: 'Nodemailer is unicode friendly ✔',

//   // plaintext body
//   text: 'Hello to myself!',

//   // HTML body
//   html:
//       '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
//       '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',

//   // An array of attachments
//   // attachments: [
//   //     // String attachment
//   //     {
//   //         filename: 'notes.txt',
//   //         content: 'Some notes about this e-mail',
//   //         contentType: 'text/plain' // optional, would be detected from the filename
//   //     },

//   //     // Binary Buffer attachment
//   //     {
//   //         filename: 'image.png',
//   //         content: Buffer.from(
//   //             'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
//   //                 '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
//   //                 'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
//   //             'base64'
//   //         ),

//   //         cid: 'note@example.com' // should be as unique as possible
//   //     },
//   // ]
// };

// transporter.sendMail(message, (error, info) => {
//   if (error) {
//       console.log('Error occurred');
//       console.log(error.message);
//       return process.exit(1);
//   }

//   console.log('Message sent successfully!');
//   console.log(nodemailer.getTestMessageUrl(info));

//   // only needed when using pooled connections
//   transporter.close();
// });


app.listen(port, () => {
  console.log('server is running at http://localhost:', port)
})
