// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";

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
      <div className="contents">
        {/* <ImageList sx={{ width: 900 }} cols={3} gap={11}>
        {movies.map((movie) => (
          <ImageListItem key={movie.poster}>
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
              alt={movie.title}
            />
            <ImageListItemBar title={movie.title} position="below" />
          </ImageListItem>
        ))}
      </ImageList> */}

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
}

export default App;
