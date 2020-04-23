import React, { useCallback, useEffect, useState } from "react";
import { fetchData } from "./actions/fetchData";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import Dashboard from "./components/dashboard";
import Carousel from "./components/carousel";
import Daily from "./components/daily";
import SideBar from "./components/sideBar";

function App() {
  const [city, setCity] = useState("zagreb");
  const [visible, setVisible] = useState(false);
  const date = new Date().toDateString().toUpperCase();
  const weatherSelector = useSelector((state) => state.weatherInfo.weatherinfo);

  const dispatch = useDispatch();
  const getWeatherInfoAction = (city) => dispatch(fetchData(city));

  useEffect(() => {
    getWeatherInfoAction(city);
    /*let interval = null;
    interval = setInterval(() => {
      getWeatherInfoAction(city);
    }, 10000);*/
  }, []);

  const foo = useCallback(() => {
    setVisible(true);
  }, []);

  const woo = () => {
    setVisible(false);
  };

  /**
   * remove element from object
   * source  https://stackoverflow.com/questions/18599242/remove-certain-elements-from-map-in-javascript
   * @returns {*}
   * @param obj
   * @param check
   */
  function removeKeyStartsWith(obj, check) {
    Object.keys(obj).forEach(function (key) {
      //if(key[0]==letter) delete obj[key];////without regex
      if (key.match("^" + check)) delete obj[key]; //with regex
    });
    return obj;
  }

  /**
   * convert time to string
   * @param time
   * @returns {string}
   */
  function convertTime(time) {
    const now = new Date(time * 1000);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  /* data to propagate */
  const { current, daily, hourly } = weatherSelector;

  return (
    <div className="App">
      <div className="background">
        <div className="container">
          <div className="main">
            <Dashboard date={date} city={city} current={current} />
            <Carousel
              current={current}
              removeKeyStartsWith={removeKeyStartsWith}
              convertTime={convertTime}
            />
            <Daily
              convertTime={convertTime}
              daily={daily}
              woo={woo}
              visible={visible}
            />
            <SideBar convertTime={convertTime} hours={hourly} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
