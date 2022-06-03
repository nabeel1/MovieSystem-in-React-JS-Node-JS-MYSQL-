import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar"
import './App.css';
import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import AddMovie from "./pages/AddMovie";
import Home from "./pages/Home";

function App() {
  
    const [movieName, setmovieName] = useState("");
    const [movieReview, setmovieReview] = useState("");
     const [movieReviewList, setMovieReviewList] = useState ([]);
    const [NewmovieReview, setNewmovieReview] = useState("");

    useEffect(() =>{
      axios.get("https://movie-mysql-node.herokuapp.com/api/get").then((Response) => {
        setMovieReviewList(Response.data);
      });
    },[]);

    const deleteMovie = (movie) => {     
        axios.delete(`https://movie-mysql-node.herokuapp.com/api/del/${movie}`);

    };

    const updateMovie = (movie) => {     
      axios.put('https://movie-mysql-node.herokuapp.com/api/update',{
        movieName: movie,
        movieReview: NewmovieReview
      });
      
      setNewmovieReview("");
      alert("Update Active"+movie);
  };

  const submitReview = () => {
    axios.post('https://movie-mysql-node.herokuapp.com/api/insert', {
      movieName: movieName, movieReview:movieReview
    }).then(()=>{
        alert("Successful Insert");
    });

    setMovieReviewList([...movieReviewList, {movieName: movieName, movieReview: movieReview}]);

  };

  return (
    <div className="App">
      
       <Router>
       <Navbar />
      <Routes >
        <Route path='/'  element={<Home />} />
        <Route path='/AddMovie' element={<AddMovie />} />
        <Route path='/UpdateMovie' element={<Home />} />
        <Route path='/DeleteMovie' element={<Home />} />
      </Routes >
    </Router>
    
     <br />
      
     <br />
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e) => {setmovieName(e.target.value)}} />
        <label>Movie Review:</label>
        <input type="text" name="review" onChange={(e) => {setmovieReview(e.target.value)}} />
        <button onClick={submitReview}>Submit</button>
      </div>
        <br />

        
        {movieReviewList.map((val) => {
          return (
            <div className="mycard">
            <h1>{val.movieName} </h1> 
            <p>{val.movieReview}</p>

              <button type='button' onClick={()=>{deleteMovie(val.movieName)}}>Delete</button>
              <input id="myInput" type="text" onChange={(e) => {setNewmovieReview(e.target.value)}} />
              <button type='button' onClick={()=>{updateMovie(val.movieName)}} >Update</button>

            </div>
            );
        })}
    </div>
  );
}

export default App;
