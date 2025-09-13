var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer  = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var upload = multer();
app.use('/public', express.static(process.cwd() + '/public'));



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  } else {
    return res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
