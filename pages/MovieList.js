import Link from "next/link";
import Image from "next/image";

export const MovieList = ({ details }) => {
  return (
    <div className="container-sm movie-list">
      <div className="row">
        {details.map((single) => {
          return (
            <div className="col-3" key={single.imdbID} oc>
              <Image
                src={single.Poster}
                width={220}
                height={300}
                alt={single.Title}
              />
              <div>
                <p>{single.Title}</p>
                <p>Year: {single.Year}</p>

                <Link href={`/movies/${single.imdbID}`}>
                  <a>
                    <button>Show Details</button>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
