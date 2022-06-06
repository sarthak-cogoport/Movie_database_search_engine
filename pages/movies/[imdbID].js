import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Post = () => {
  const router = useRouter();
  const { imdbID } = router.query;

  const [film, setFilm] = useState(null);
  useEffect(() => {
    if(!router.isReady) return;
    try {
      axios
        .get(`https://www.omdbapi.com/?apikey=3400aa2e&i=${imdbID}`)
        .then((response) => {
          let result = JSON.parse(JSON.stringify(response));
          let { data } = result;
          setFilm(data);
          
        });
    } catch (err) {
      console.log(err);
    }
  }, [router.isReady]);
  if (!film) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="container-sm">
        <div className="row cardcont">
          
          <div className="col-6 image-details">
            <Image
              src={film.Poster}
              alt={film.Title}
              width={383}
              height={574}
            />
          </div>

          <div className="text-details col col-xs-6">
            <h1>{film.Title}</h1>
            <p>{film.Plot}</p>
            <div className="additional-details">
              <span className="genre-list">{film.Genre}</span>
              <span className="production-list">Director: {film.Director}</span>
              <div className="row" style={{ marginTop: "30px" }}>
                <div style={{ marginTop: "10px" }} className="col-sm-6">
                  Original Release:
                  <span className="meta-data">{film.Released}</span>
                </div>
                <div style={{ marginTop: "10px" }} className="col-sm-6">
                  Running Time:
                  <span className="meta-data">{film.Runtime}</span>
                </div>
                <div style={{ marginTop: "10px" }} className="col-sm-6">
                  Box Office:
                  <span className="meta-data">{film.BoxOffice}</span>
                </div>
                <div style={{ marginTop: "10px" }} className="col-sm-6">
                  IMDB Rating:
                  <span className="meta-data">{film.imdbRating}</span>
                </div>
              </div>
            </div>
            Actors:
            <p className="meta-data">{film.Actors}</p>
            <Link href={'/'}>
              <a>
                <button style={{marginRight:"10px"}} type="button" className="btn btn-light">
                  Home
                </button>
              </a>
            </Link>
            <Link href={`https://www.imdb.com/title/${film.imdbID}`} >
              <a target="_blank">
                <button type="button" className="btn btn-light">
                  More Info
                </button>
              </a>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
