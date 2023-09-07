// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [originalMovies, setOriginalMovies] = useState([]); //全now playing
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=f4d043da0bfd25667e6825c40156d398"
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setOriginalMovies(data.results);
      });
  }, []);

  // async function callAPI() {
  //   const res = await fetch(
  //     "https://api.themoviedb.org/3/movie/now_playing?api_key=f4d043da0bfd25667e6825c40156d398"
  //   );
  //   const data = await res.json();
  //   setMovies(data.results);
  // }
  // callAPI();

  const [searchWord, setSearchWord] = useState("");
  const search = (e) => {
    e.preventDefault();
    const filteredMovies = originalMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setMovies(filteredMovies);
    setSearchWord("");
  };
  return (
    <div>
      <h2>Now Plaing in the theater</h2>
      <form onSubmit={search}>
        <input
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button>search</button>
      </form>
      <div className="contents">
        {movies.map((movie) => (
          <div className="content">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
              alt={movie.title}
            ></img>
            <p key={movie.name}>{movie.title}</p>
            {/* <li key={movie.overview}>{movie.overview}</li> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
