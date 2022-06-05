import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { MovieList } from "./MovieList";
import list from './movieList.json';

export default function Home() {
  const [movieName, setMovieName] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);

  let details = JSON.parse(JSON.stringify(list));



  const fetchMovieInfo = () => {
    try {
      axios
        .get(`https://www.omdbapi.com/?apikey=3400aa2e&s=${movieName}`)
        .then((response) => {
          let result = JSON.parse(JSON.stringify(response));
          const { data } = result;
          const { Search } = data;
          setMovieInfo(Search);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container main">
      <div className="container-sm top-container">
        <h2>Movie Database App</h2>

        <input
        className="search"
          type="text"
          placeholder="Search for any movie..."
          onChange={(e) => setMovieName(e.target.value)}
        />
        <button href="#" type="submit" onClick={fetchMovieInfo}>
          Search
        </button>
      </div>
      <div>
        {movieInfo ?<MovieList details={movieInfo}/>:<MovieList details={list} />}
      </div>
      
    </div>
  );
}
