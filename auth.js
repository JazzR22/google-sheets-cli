
const { google } = require('googleapis');
const path = require('path');

async function authenticate() {
  const keyFile = path.join(__dirname, 'service-account.json'); // Ruta al archivo JSON de la cuenta de servicio
  const auth = new google.auth.GoogleAuth({
    keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return auth.getClient();
}

module.exports = authenticate;