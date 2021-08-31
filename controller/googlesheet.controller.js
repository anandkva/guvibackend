const { google } = require('googleapis');
const keys = require('../keys.json');



const googleapi = (req, res) => {
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
        } else {
            console.log("connected");
            googleSheet(client)
        }

    })
    const googleSheet = (auth) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
            range: 'Class Data!A2:E',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
                console.log('Name, Major:');
                rows.map((row) => {
                    const apidata = (`${row[0]}, ${row[4]}`);
                    console.log(apidata)
                });
            } else {
                console.log('No data found.');
            }
        });
    }

}
module.exports = {
    googleapi
}