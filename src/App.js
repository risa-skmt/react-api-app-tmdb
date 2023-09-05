// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  async function callAPI() {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=f4d043da0bfd25667e6825c40156d398"
    );
    const data = await res.json();
    //console.log(data);
    setMovies(data.results);
  }
  callAPI();

  return (
    <div>
      <h2>Now Plaing in the theater</h2>
      {movies.map((movie) => (
        <div>
          <li key={movie.name}>{movie.title}</li>
          <li key={movie.overview}>{movie.overview}</li>
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
            alt={movie.title}
          ></img>
        </div>
      ))}
    </div>
  );
}

export default App;
