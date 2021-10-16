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
const getTemplateAuthenticationAdmin = (name, code) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Para continuar con su inicio de sesion ingrese el siguiente codigo ${code}</p>
  </div>`;
};

const getTemplateProductStock = (
  username,
  productName,
  productImage,
  productId
) => {
  return `
  <head>
  <link rel="stylesheet" href="./style.css">
</head>

<div id="email___content">
  <h2>Hola ${username}</h2>
  <p>Te avisamos que ya tenemos disponible el siguiente producto por el cual estas interesado/a: </p>
  <img src=${productImage} alt='' />
  <a
  href="https://somosolea.vercel.app/product/${productId}"
  target="_blank"
  >${productName}</a>
</div>`;
};

const getTemplateAproved = (name, price) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queriamos avisarte que tu compra por ${price} se completo exitosamente!</p>
      <a href="https://somosolea.vercel.app/">Visite nuestra pagina!</a>
  </div>`;
};
const getTemplateRejected = (name, price) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>Queriamos avisarte que hubo un problema en tu compra.. Intentelo nuevamente!</p>
      <a href="https://somosolea.vercel.app/">Visite nuestra pagina!</a>
  </div>`;
};
const getTemplateProductLetter = (name, fecha, product, offert, token) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>El dia ${fecha} el producto ${product} se encontrara con un ${offert}% de descuento!</p>
      <p><a href="https://somosolea.vercel.app/" target="_blank">Visite nuestra página!</a></p>
      <p><a href="https://somosolea.vercel.app/newsletter/desuscribe/${token}"" target="_blank">Anular suscripción</a></p>
  </div>
  `;
};
const getTemplateCategoryLetter = (name, fecha, category, offert, token) => {
  return `
  <head>
      <link rel="stylesheet" href="./style.css">
  </head>
  
  <div id="email___content">
      <h2>Hola ${name}</h2>
      <p>El dia ${fecha} toda la categoria ${category} se encontrara con un ${offert}% de descuento!</p>
      <p><a href="https://somosolea.vercel.app/" target="_blank">Visite nuestra página!</a></p>
      <p><a href="https://somosolea.vercel.app/newsletter/desuscribe/${token}>Anular suscripción</a></p>
  </div>
  `;
};
module.exports = {
  sendEmail,
  getTemplate,
  getTemplateChangePassword,
  getTemplateProductLetter,
  getTemplateAdminChangePassword,
  getTemplateAproved,
  getTemplateAuthenticationAdmin,
  getTemplateProductStock,
  getTemplateRejected,
  getTemplateCategoryLetter,
};
