import Link from "next/link";
import Image from "next/image";

export const MovieList = ({ details }) => {
  return (
    <div className="container-sm movie-list">
      <div className="row">
        
        {details.map((single) => {
          return (
            <div
              className="col col-sm-3"
              style={{ marginTop: "30px", textAlign: "center" }}
              key={single.imdbID}
              oc
            >
              <Link href={`/movies/${single.imdbID}`}>
                <a>
                  <Image
                    src={single.Poster}
                    width={220}
                    height={300}
                    alt={single.Title}
                  />
                </a>
              </Link>
              <div>
                <p>{single.Title}</p>
                <p>Year: {single.Year}</p>
                <p>{single.Genre}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
