import { useEffect, useState } from "react";
import "../css/ScreenTime.css";

const ScreenTime = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchedPopularMovies = [];
    const fetchPopularMovies = async () => {
      for (let i = 1; i < 10; i++) {
        let page = i;
        try {
          const response = await fetch(
            // 言語：英語, ページ数9で指定　　popularの映画を取得
            `https://api.themoviedb.org/3/movie/popular?api_key=f4d043da0bfd25667e6825c40156d398&with_original_language=en&page=${page}`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          fetchedPopularMovies.push(...data.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setMovies(fetchedPopularMovies);
    };
    fetchPopularMovies();
  }, []);

  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  //moviesの各情報取得。時間で制限かけてmoviesに入れる
  const MoviesInfo = async (selectedHour, selectedMinute) => {
    let allId = movies.map((movie) => movie.id);

    let runtimeFiltered = [];
    for (let k = 1; k < allId.length; k++) {
      let movieId = allId[k];
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=f4d043da0bfd25667e6825c40156d398`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.runtime >= 180) {
          console.log(data);
          runtimeFiltered.push(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setMovies(runtimeFiltered);
  };

  return (
    <>
      <h2>Which one is tonight movie?</h2>
      <select
        value={selectedHour}
        onChange={(e) => setSelectedHour(e.target.value)}
      >
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="00">00</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <span>時</span>
      <select
        value={selectedMinute}
        onChange={(e) => setSelectedMinute(e.target.value)}
      >
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <span>分</span>
      <button onClick={() => MoviesInfo(selectedHour, selectedMinute)}>
        search
      </button>

      <div>
        {selectedHour}:{selectedMinute}
      </div>
      <div className="contents">
        {/* 以下、popularMoviesの中身を表示 */}
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
