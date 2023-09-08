import { useEffect, useState } from "react";
import "../css/ScreenTime.css";
const ScreenTime = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = [];

      for (let i = 1; i < 30; i++) {
        const page = i;

        try {
          const response = await fetch(
            // 言語：英語, ページ数29で指定
            `https://api.themoviedb.org/3/discover/movie?api_key=f4d043da0bfd25667e6825c40156d398&with_original_language=en&page=${page}`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          fetchedMovies.push(...data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h2>Which one is tonight movie?</h2>

      {/* <form onSubmit={search}>
        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button>search</button>
      </form> */}

      <div className="contents">
        {movies.map((movie) => (
          <div className="content">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
              alt={movie.title}
            ></img>
            <p key={movie.name}>{movie.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScreenTime;

{
  /* <li key={movie.overview}>{movie.overview}</li> */
}
