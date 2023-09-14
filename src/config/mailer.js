const accountTransport = require("./account_transport.js");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

const mail_rover = async (callback) => {
  const oauth2Client = new OAuth2(
    accountTransport.auth.clientId,
    accountTransport.auth.clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  console.log(accountTransport);

  oauth2Client.setCredentials({
    refresh_token: accountTransport.auth.refreshToken,
    tls: {
      rejectUnauthorized: false,
    },
  });
  oauth2Client.getAccessToken((err, token) => {
    if (err) return console.log(err);
    accountTransport.auth.accessToken = token;
    callback(nodemailer.createTransport(accountTransport));
  });
};

module.exports = { mail_rover, accountTransport };
