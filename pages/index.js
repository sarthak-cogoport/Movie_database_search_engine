import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { MovieList } from './MovieList';


export default function Home() {
  const [movieName, setMovieName] = useState(null);
	const [movieInfo, setMovieInfo] = useState(null);

  const fetchMovieInfo = () => {
		try {
			const res = axios.get(`https://www.omdbapi.com/?apikey=3400aa2e&s=${movieName}&plot=short`).then((response)=>{
        let result = JSON.parse(JSON.stringify(response));
        const {data} = result;
        const {Search} = data;
        setMovieInfo(Search[0]);
      });
      
		} catch (err) {
			console.log(err);
		}
	};


	return (
		<div className="">
			<h2 >
				Movie App
			</h2>
      <div >
				<div >
					<input
						type="text"
						placeholder="Search for any movie..."
            onChange={(e)=>setMovieName(e.target.value)}
					/>
					<button href='#' type='submit' onClick={fetchMovieInfo}>
						Search
					</button>
				</div>
				{movieInfo && (
					<div >
						<Image
							src={movieInfo.Poster}
							width={220}
							height={300}
							alt={movieInfo.Title}
						/>
						<div>
							<h2 >
								<span >
									Title:{' '}
								</span>{' '}
								{movieInfo.Title}
							</h2>
							<h2 >
								<span>
									Year:{' '}
								</span>{' '}
								{movieInfo.Year}
							</h2>
							
							<Link href={`https://www.imdb.com/title/${movieInfo.imdbID}`}>
								<a>
									<button >
										Visit on IMDB
									</button>
								</a>
							</Link>
						</div>
					</div>
				)}

			</div>
      <MovieList/>
		</div>
	);
}