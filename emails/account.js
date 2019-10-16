const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSharedListEmail = (emails) => {
  sgMail.send({
    to: emails,
    from: 'support@groshary.com',
    subject: 'You have been invited to edit a list',
    text: 'You have been invited to edit '
  })
};


module.exports = {
  sendSharedListEmail
};