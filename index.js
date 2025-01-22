#!/usr/bin/env node

const { google } = require('googleapis');
const authenticate = require('./auth');

async function readSheet(spreadsheetId, range, hidehidden = true) {
  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      ranges: [range],
      includeGridData: true,
    });

    const sheet = response.data.sheets[0]; // Primera hoja
    const rows = sheet.data[0].rowData || [];
    const colsMetadata = sheet.data[0].columnMetadata || [];
    const rowsMetadata = sheet.data[0].rowMetadata || [];

    let filteredData = rows;

    if (hidehidden) {
      // Filtrar filas ocultas
      const visibleRows = rowsMetadata.map((row, index) => ({
        index,
        hidden: row.hiddenByUser || row.hiddenByFilter || false,
      }));

      filteredData = filteredData.filter((_, index) => !visibleRows[index].hidden);
    }

    // Procesar datos visibles
    const values = filteredData.map(row =>
      (row.values || []).map(cell => (cell.effectiveValue ? cell.effectiveValue.stringValue || cell.effectiveValue.numberValue : null))
    );

    console.log('Datos leídos (ocultos filtrados):', hidehidden);
    console.log(values);
  } catch (error) {
    console.error('Error al leer la hoja:', error.message);
  }
}

async function writeSheet(spreadsheetId, range, values) {
  try {
    const auth = await authenticate();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Escritura exitosa:');
    console.log(response.data);
  } catch (error) {
    console.error('Error al escribir en la hoja:', error.message);
  }
}

// Ejecución desde consola
(async () => {
  const args = process.argv.slice(2); // Obtiene argumentos de comandos

  if (args[0] === 'read') {
    const spreadsheetId = args[1];
    const range = args[2];
    const hidehidden = args[3] === 'false' ? false : true; // Por defecto, true

    if (!spreadsheetId || !range) {
      console.error('Uso: node index.js read <spreadsheetId> <range> [hidehidden]');
      process.exit(1);
    }

    await readSheet(spreadsheetId, range, hidehidden);
  } else if (args[0] === 'write') {
    const spreadsheetId = args[1];
    const range = args[2];
    let values;

    try {
      // Si el argumento termina en .json, cargar desde archivo
      if (args[3].endsWith('.json')) {
        values = JSON.parse(fs.readFileSync(args[3], 'utf8'));
      } else {
        // Trata los valores como un string literal y evalúa JSON
        values = eval(`(${args[3]})`); // Evalúa directamente como JSON
      }
    } catch (error) {
      console.error('Error al procesar los valores:', error.message);
      process.exit(1);
    }

    if (!spreadsheetId || !range || !values) {
      console.error('Uso: node index.js write <spreadsheetId> <range> <values>');
      process.exit(1);
    }

    await writeSheet(spreadsheetId, range, values);
  } else {
    console.error('Comando desconocido. Usa "read" o "write".');
  }
})();
