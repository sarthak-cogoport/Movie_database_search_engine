import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { useState,useEffect } from "react";


const Post = () => {
  const router = useRouter();
  const { imdbID } = router.query;

const [film, setFilm] = useState(null)
useEffect(()=>{
    axios
        .get(`https://www.omdbapi.com/?apikey=3400aa2e&i=${imdbID}`)
        .then((response) => {
          let result = JSON.parse(JSON.stringify(response));
            let {data} = result;
          setFilm(data);
        });
},[])
if(!film) return null;

  return (<>
      
        <div className ="container-sm movie-page" >
          
          <Image src={film.Poster} alt={film.Title} width="220px" height="300px"/>

        
        <div>
        <h1>{film.Title}</h1>
        <p>{film.Genre}</p>
        <p>{film.Plot}</p>
        <p>{film.Actors}</p>
        
        </div>
        </div></>
      
)};

export default Post;
