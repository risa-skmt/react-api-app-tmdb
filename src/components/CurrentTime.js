import { useEffect } from "react";

const CurrentTime = ({
  displayTime,
  setCurrentDate,
  setCurrentHour,
  setCurrentMinute,
  currentHour,
  currentMinute,
}) => {
  useEffect(() => {
    const currentTime = setInterval(() => {
      if (displayTime) {
        //today = new Date("2023-09-13T22:00:00");   //固定値で検証
        let today = new Date();
        setCurrentDate(today.getTime());
        setCurrentHour(today.getHours());
        if (today.getMinutes() < 10) {
          setCurrentMinute("0" + today.getMinutes());
        } else {
          setCurrentMinute(today.getMinutes());
        }
      }
    }, 1000);

    return () => clearInterval(currentTime);
  }, [displayTime]);

  return (
    <p className="currentClock">
      {currentHour}:{currentMinute}
    </p>
  );
};

export default CurrentTime;
