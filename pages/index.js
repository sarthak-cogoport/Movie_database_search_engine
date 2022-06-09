import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState,useEffect } from "react";
import Link from "next/link";
import { MovieList } from "./MovieList";
import list from "./movieList.json";


export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [movieInfo, setMovieInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIsError] = useState(false)
  const [films,setFilms] = useState([])

  

  const fetchMovieInfo = () => {
    
    try {
      setIsLoading(true);
      axios
        .get(`https://www.omdbapi.com/?apikey=3400aa2e&s=${movieName}`)
        .then((response) => {
          let result = JSON.parse(JSON.stringify(response));
          if(result.data.Response==="False")
          {
            setIsError(true);
            setIsLoading(false);
            return;
          }
          setIsError(false);
          const { data } = result;
          const { Search } = data;
          setMovieInfo(Search);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchFilmDetails = () =>{
    try {
      axios
        .get("http://127.0.0.1:3000/movie/all",{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((response) => {
          let result =JSON.parse(JSON.stringify(response));
          let {data} = result
          console.log(data)
          setFilms(data);
          
        });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchFilmDetails();
  },[])

  return (
    <div className="container main">
      <div className="container-sm top-container">
        <h2>Movie Database App</h2>
        <div className="input-group mb-3 search">
          <input
            type="text"
            className="form-control"
            placeholder="Search for any movie..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => setMovieName(e.target.value)}
          />
        </div>
        <button
            className="btn btn-outline-success "
            type="button"
            id="button-addon2"
            onClick={fetchMovieInfo}
            disabled={movieName===""?true:false}
          >
            Search
          </button>
          <Link href={'/'}>
              <a>
                <button style={{marginLeft:"10px"}} type="button" className="btn btn-outline-light">
                  Home
                </button>
              </a>
            </Link>
      </div>
      {isLoading?<p className="loading">Loading...</p>:null}
      {isErr?<p className="loading">Movie not found. Please search again.</p>:null}
      <div>
        {movieInfo ? (
          <MovieList details={movieInfo} />
        ) : (
          <MovieList details={films}/>
        )}
        
      </div>
    </div>
  );
}
