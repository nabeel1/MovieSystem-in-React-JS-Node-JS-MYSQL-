var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createPool({
host: "us-cdbr-east-05.cleardb.net",
user: "b9ec5f4a22c75d",
password: "bfd661c8",
database: "heroku_c3244545d090310",
});

/* GET result from db */
router.get('/api/get', function(req, res) {
  const mysql_get = "SELECT * FROM movie_reviews";
  db.query(mysql_get,(err,result)=>{
    res.send(result);
  });

});

/* Insert into DB. */
router.post('/api/insert', function(req, res) {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const mysql_insert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(mysql_insert,[movieName,movieReview], (err,result) =>{
    console.log(result);
  });

});

/* Delete result from db */
router.delete("/api/del/:movieName", function(req, res) {
  const Name = req.params.movieName;
  const mysql_del = "DELETE FROM movie_reviews WHERE movieName=?";
  db.query(mysql_del,Name,(err,result)=>{
      if(err) console.log(err);
  });

});

/* Update result from db */
router.put("/api/update", function(req, res) {
  const name = req.body.movieName;
  const review = req.body.movieReview;
  const mysql_update = "UPDATE movie_reviews SET movieReview=? WHERE movieName=?";
  db.query(mysql_update,[review,name],(err,result)=>{
      if(err) console.log(err);
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
