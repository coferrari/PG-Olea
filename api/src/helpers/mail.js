const nodemailer = require("nodemailer");
const mail = {
  user: "oleaproyecto@gmail.com",
  pass: "Henry2021",
};
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  autentication: "yes",
  auth: {
    user: mail.user,
    pass: mail.pass,
  },
});
const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Olea <${mail.user}>`,
      to: email,
      subject,
      text: "Hola amigos, suscríbance para más videos",
      html,
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};
const getTemplate = (name, token) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Hola ${name}</h2>
          <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
          <a
              href="http://localhost:3000/auth/confirmregister/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
};

module.exports = {
  sendEmail,
  getTemplate,
};
