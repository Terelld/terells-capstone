const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors'); 


//always require and configure near top!!
require('dotenv').config();

require('./config/database');
   
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

   
app.use(logger('dev'));
app.use(express.json());


// app.get('/config/uscities.csv', (req, res) => {
//   res.sendFile(path.join(__dirname, 'config', 'uscities.csv'));
// });



app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;


app.use('/api/users', require('./routes/api/users'))


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


	
app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

