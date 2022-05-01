const nodemailer = require("nodemailer");

let transporter = null;

async function main() {
  let testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

}

main().catch(console.error);

async function sendEmail() {
  const options = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  }

  try {
    let info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return info.messageId;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  sendEmail
};
