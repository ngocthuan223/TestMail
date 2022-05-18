const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config()
const formidable = require('express-formidable');

app.use(cors())
app.use(formidable({ multiples: true }));

//The following line is needed to write APIs in other Folders/Files

app.use('/Mail', require('./src/controllers/MailController'));
app.use('/MailRs', require('./src/controllers/MailRsController'));
app.use('/pdf', require('./src/controllers/ContractPdfController'));
app.use('/pdfRs', require('./src/controllers/ContractPdfRsController'));

// Adding these following 2 APIs for testing purpose
app.get('/', (req, res) => { res.send('Hello World'); });
app.post('/', (req, res) => { res.send('Hello World'); });

//PORT = enviorment variable
const port = process.env.PORT || 8500;

app.listen(port, async () => {
    console.log('\n\n\n\nServer started on port ' + port + ' ...\n\n\n\n')
});
