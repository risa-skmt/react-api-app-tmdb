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
    //console.log(data.results);
    setMovies(data.results);
  }
  callAPI();
  return (
    <div>
      <h2>Hello</h2>
      {movies.map((movie) => (
        <li>{movie.title}</li>
      ))}
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
