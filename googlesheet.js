const { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

client.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  }else{
    console.log("connected");
    googleSheet(client)
  }

})
const googleSheet = (auth) =>{
  const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
    spreadsheetId: '1T-E-Z5dJbnO1gsaGkzTdJa-Nd0kZFfq9ID5CYrLNC4M',
    range: 'Class Data!A1:B11',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      
      rows.map((row) => {
        res.send(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}