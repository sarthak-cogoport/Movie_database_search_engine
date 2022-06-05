import Link from "next/link";
import list from "./movieList.json";
import Image from "next/image";

export const MovieList = () => {
  let details = JSON.parse(JSON.stringify(list));
  return (

    <div>
        
      {details.map((single) => {
          return (
            <div key={single.imdbID}>
            <Image
              src={single.Images[0]}
              width={220}
              height={300}
              alt={single.Title}
            />
            <div>
              <h2>
                <span>Title: </span> {single.Title}
              </h2>
              <h2>
                <span>Year: </span> {single.Year}
              </h2>
    
              <Link href={`https://www.imdb.com/title/${single.imdbID}`}>
                <a>
                  <button>Visit on IMDB</button>
                </a>
              </Link>
            </div>
          </div>
          )
          
        
      })}
      
    </div>
  );
};
