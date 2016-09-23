var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var articles = require('./models/articles.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

var db = mongoose.connection;
//
db.on('error', function (err) {
   console.log('Mongoose Error: ', err);
});
//
db.once('open', function () {
   console.log('Mongoose connection successful.');
});

// Main Route. This route will redirect to our rendered React application
// app.get('/', function(req, res){
//   res.sendFile('./public/index.html');
// });

app.get('/api', function(req, res) {

  // This GET request will search for the latest clickCount
  articles.find({}).sort('date: -1').exec(function(err, doc){

           if(err){
             console.log(err);
           }
           else {
             res.send(doc);
           }
    });
});


app.post('/api/', function(req, res){
       var newArticle = new Articles(req.body);
        console.log(req.body);
        var title = req.body.title
        var date = req.body.date;
        var url = req.body.url;

       // Note how this route utilizes the findOneAndUpdate function to update the clickCount.
      newArticle.save(function(err, doc){
              if(err){
                console.log(err);
              }
              else{
                   res.send(doc.id);
              }
       });
  });

app.delete('/api/saved'/, function(req,res){
  var url = req.param('url');
  Article.find({"url": url}).remove().exec(function(err, data){
    if(err){
      console.log(err);
    }
    else{
      res.send("Deleted");
    }
  });
});


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});