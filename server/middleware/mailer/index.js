const nodemailer = require('nodemailer')
const config = require('../../config')
const ErrorController = require('../../controller/error').api

let transporter = nodemailer.createTransport(
  {
    host: 'smtp.163.com',
    port: 465,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass,
    }
  }
)

module.exports = function sendAlarmEmail(method, requestUrl, err, cb) {
  message = {
    from: '<' + config.mail.user + '>',
    // Comma separated list of recipients
    to: '"zhaoxu" <zhaoxu@rawstonedu.com>',
    subject: 'Elapse Server has occurred an error!',
    text: 'Error Occurred',
    // HTML body
    html: `
      <p style="font-size: 18px">An error occurred on request: <strong>${method}<em>${requestUrl}</em></strong></p>
      <table style="border: 1px solid #f1f1f1; table-layout: fixed; border-collapse: collapse">
        <tbody>
          <tr>
            <td width="100" style="padding: 5px; border: 1px solid #f1f1f1; font-size: 16px">Error Message:</td>
            <td style="padding: 5px; border: 1px solid #f1f1f1; font-size: 16px">${err.message}</td>
          </tr>
          <tr>
            <td width="100" style="padding: 5px; border: 1px solid #f1f1f1; font-size: 16px">Error Stack:</td>
            <td style="padding: 5px; border: 1px solid #f1f1f1; font-size: 16px">${err.stack }</td>
          </tr>
        </tbody>
      </table>
    `
  }

  transporter.sendMail(message, async (error, info) => {
    if (error) {
      cb(error, null)
      return
    }
  
    console.log('Message sent successfully!');
    cb(null, info)
    transporter.close();
  })
}
