const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const fileUpload = require('express-fileupload');
const unirest = require('unirest');
const watson = require('watson-developer-cloud');
const fs = require('fs');
const bodyParser = require('body-parser');
const Clarifai = require('clarifai');
const app = express();

// use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(fileUpload());
// instantiate a new Clarifai app passing in your api key.
const Clarifaiapp = new Clarifai.App({
 apiKey: 'bcafe00f744d4fc3a67d0b78951e9fb2'
});

app.get('/demo', function (req, res) {
  // predict the contents of an image by passing in a url
Clarifaiapp.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
  function(response) {
    res.send(response);
    console.log(response);
  },
  function(err) {
    console.error(err);
  }
);
});

app.post('/upload', function (req, res) {
  if (!req.files) 
    return res.status(400).send('No files were uploaded.');
  
  // The name of the input field (i.e. "sampleFile") is used to retrieve the
  // uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function (err) {
    if (err) 
      return res.status(500).send(err);
    
    res.send('File uploaded!');
  });
});

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