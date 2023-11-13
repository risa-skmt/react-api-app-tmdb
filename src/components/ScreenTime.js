import { useEffect, useState } from "react";
import "../css/ScreenTime.css";
import CurrentTime from "./CurrentTime";

const ScreenTime = () => {
  const api_key = "f4d043da0bfd25667e6825c40156d398";
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  //popularMovieを表示
  useEffect(() => {
    const fetchedPopularMovies = [];
    const fetchPopularMovies = async () => {
      for (let i = 1; i < 10; i++) {
        let page = i;
        try {
          const response = await fetch(
            // 言語：英語, ページ数9で指定　　popularの映画を取得
            `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&with_original_language=en&page=${page}`
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
      setPopularMovies(fetchedPopularMovies);
    };
    fetchPopularMovies();
  }, []);

  const [selectedHour, setSelectedHour] = useState("21");
  const [selectedMinute, setSelectedMinute] = useState("00");

  //moviesの各情報取得。時間で制限かけてmoviesに入れる
  const FilteredMovies = async () => {
    setDisplayTime(false);
    setMovies(popularMovies);
    //時間差の計算
    const sleepTime = new Date();
    sleepTime.setHours(
      parseInt(selectedHour, 10),
      parseInt(selectedMinute, 10),
      0,
      0
    );

    // sleepTime が現在の時刻より前なら、日にちを1日進める
    if (selectedHour < currentHour) {
      sleepTime.setDate(sleepTime.getDate() + 1);
    }
    const diff = sleepTime.getTime() - currentDate;

    const leftMinute = Math.floor(diff / (60 * 1000));

    let allId = movies.map((movie) => movie.id);
    let runtimeFiltered = [];
    for (let k = 1; k < allId.length; k++) {
      let movieId = allId[k];
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data.runtime <= leftMinute && data.runtime !== 0) {
          runtimeFiltered.push(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setMovies(runtimeFiltered);
    console.log(movies);
  };

  //現在時刻の取得を続けるか判定
  const [displayTime, setDisplayTime] = useState(true);
  //現在時刻管理
  const [currentDate, setCurrentDate] = useState("");
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);

  const [selectedGenre, setSelectedGenre] = useState("");
  const allGenres = [];
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.genres);
        allGenres.push(...data.genres);
        console.log(allGenres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <>
      <h2>Which one is tonight movie?</h2>

      <CurrentTime
        displayTime={displayTime}
        setCurrentDate={setCurrentDate}
        setCurrentHour={setCurrentHour}
        setCurrentMinute={setCurrentMinute}
        currentHour={currentHour}
        currentMinute={currentMinute}
      />
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
      <button onClick={FilteredMovies}>search</button>

      <div>
        <select onChange={(e) => setSelectedGenre(e.target.value)}>
          {/* {allGenres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))} */}
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="contents">
        {/* 以下、moviesの中身を表示 */}
        {movies.map((movie) => (
          <div key={movie.id} className="content">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
              alt={movie.title}
            ></img>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScreenTime;
