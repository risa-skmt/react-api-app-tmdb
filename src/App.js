// import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NowPlaying from "./components/NowPlaying.js";
import ScreenTime from "./components/ScreenTime.js";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/screen_time" element={<ScreenTime />} />
          <Route path="/nowplaying" element={<NowPlaying />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
