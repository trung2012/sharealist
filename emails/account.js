const sendGrid = require('@sendgrid/mail');

sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendSharedListEmail = (emailAddress, url) => {
  const email = {
    to: emailAddress,
    from: {
      email: 'support@sharealist.com',
      name: 'Sharealist'
    },
    subject: 'Invitation on Sharealist',
    templateId: 'd-931b1ca74f2e47978cbb7db56784d53d',
    dynamic_template_data: {
      url
    }
  };

  sendGrid.send(email, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
};


module.exports = {
  sendSharedListEmail
};