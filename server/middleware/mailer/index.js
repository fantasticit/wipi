const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport(
  {
    host: 'smtp.163.com',
    port: 465,
    auth: {
      user: 'bken2016@163.com',
      pass: 'ben123456'
    }
  }
)

module.exports = function sendAlarmEmail(requestUrl, err) {
  message = {
    from: '<bken2016@163.com>',
    // Comma separated list of recipients
    to: '"zhaoxu" <zhaoxu@rawstonedu.com>',
    subject: 'Elapse Server has occurred an error!',
    text: 'Error Occurred',
    // HTML body
    html: `
      <p style="font-size: 18px">An error occurred on request: <strong><em>${requestUrl}</em></strong></p>
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

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log('Error occurred');
      console.log(error.message);
      return
    }
  
    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));
  
    transporter.close();
  })
}
