const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const unirest = require('unirest');
const watson = require('watson-developer-cloud');
const fs = require('fs');
const bodyParser = require('body-parser');
const Clarifai = require('clarifai');
const app = express();
var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname)
  }
})

var upload = multer({storage: storage}).single('myFile')

// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      return res.end("Error loading file!")
    }
    var visual_recognition = watson.visual_recognition({api_key: 'd79067c7cb9a927a0e6232a140c25ee649192980', version: 'v3', version_date: '2016-05-20'});
    var sFileName = path.join(__dirname, req.file.path);

    var params = {
      images_file: fs.createReadStream(sFileName),
      threshold: 0.8,
      // classifier_ids:['Food'],
    };

    visual_recognition.classify(params, function (err, results) {
      if (err) {
        console.log(err);
      } else {
        // console.log(results.images[0].classifiers);
        res.json(JSON.stringify(results.images[0].classifiers, null, 2));
        // fs.unlink(__dirname, req.file.path);
      }
    });
    // Everything went fine
  })
})

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array
    .from(Array(count).keys())
    .map(i => generatePassword(12, false))

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// Autocomplete food api
app.get('/api/food/autocomplete/:string', (req, res) => {
  unirest
    .get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/auto" +
      "complete?metaInformation=false&number=10&query=" + req.params.string)
    .header("X-Mashape-Key", "ZZkHaioXJOmshgsv5EMbDD34Sd8cp1UBiB1jsnhhQB5yF9DYh2")
    .header("Accept", "application/json")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
      res.json(result.body);
    });
});

//Food api search recepie by ingredients
app.get('/api/food/:count/:ingredients', (req, res) => {
  unirest
    .get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredi" +
      "ents?fillIngredients=true&ingredients=" + req.params.ingredients + "&limitLicense=false&number=" + req.params.count + "&ranking=2")
    .header("X-Mashape-Key", "ZZkHaioXJOmshgsv5EMbDD34Sd8cp1UBiB1jsnhhQB5yF9DYh2")
    .header("Accept", "application/json")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
      res.json(result.body);
    });
});

// Watson api after image exist
app.get('/api/watson', (req, res) => {
  var visual_recognition = watson.visual_recognition({api_key: 'd79067c7cb9a927a0e6232a140c25ee649192980', version: 'v3', version_date: '2016-05-20'});
  var sFileName = path.join(__dirname, 'resources/soya.png');

  var params = {
    images_file: fs.createReadStream(sFileName),
    threshold: 0.8,
    // classifier_ids:['Food'],
  };

  visual_recognition.classify(params, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log(results.images[0].classifiers);
      res.json(JSON.stringify(results.images[0].classifiers, null, 2));
    }
  });

});

// The "catchall" handler: for any request that doesn't match one above, send
// back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Foodie app listening on ${port}`);