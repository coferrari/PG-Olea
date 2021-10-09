const nodemailer = require("nodemailer");
const mail = {
  user: process.env.EMAIL,
  pass: process.env.PASSWORD_EMAIL,
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
      text: "",
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
              href="https://somosolea.vercel.app/auth/confirmregister/${token}"
              target="_blank"
          >Confirmar Cuenta</a>
      </div>
    `;
};

const getTemplateChangePassword = (email, token) => {
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
      </head>
      
      <div id="email___content">
          <h2>Hola ${email}</h2>
          <p>Para cambiar la contraseña, ingresa al siguiente enlace</p>
          <a
              href="https://somosolea.vercel.app/changepassword/${token}"
              target="_blank"
          >Cambiar contraseña</a>
      </div>
    `;
};
const getTemplateAdminChangePassword = (name, token) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Es necesario que reestablezca su contraseña</p>
      <a
          href="https://somosolea.vercel.app/changepassword/${token}"
          target="_blank"
      >Cambiar contraseña</a>
  </div>
`;
};

module.exports = {
  sendEmail,
  getTemplate,
  getTemplateChangePassword,
  getTemplateAdminChangePassword,
};
