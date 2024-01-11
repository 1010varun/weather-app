import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosWater } from "react-icons/io";
import { BsWind, BsThermometerHalf } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// WeatherCard component
const WeatherCard = ({ temp, humidity, description, name, windspeed }) => {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="bg-blue-500 p-6 rounded-lg shadow-md text-white">
        <p className="flex items-center">
          <BsThermometerHalf size={30} className="me-3" /> {temp} °C
        </p>
        <p className="flex items-center">
          <IoIosWater size={30} className="me-3" /> {humidity} %
        </p>
        <p className="flex items-center">
          <FaSun size={30} className="me-3" /> {description}
        </p>
        <p className="flex items-center">
          <BiMap size={30} className="me-3" /> {name}
        </p>
        <p className="flex items-center">
          <BsWind size={30} className="me-3" /> {windspeed} Km/h
        </p>
      </div>
    </div>
  );
};

// App component
const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [datas, setDatas] = useState({});
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [description, setDescription] = useState(0);
  const [name, setName] = useState(0);
  const [windspeed, setWindspeed] = useState(0);

  const callbylatlon = async () => {
    try {
      if (latitude.length !== 0 && longitude.length !== 0) {
        const { data } = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
        );
        console.log("API Response by LatLon:", data);
        toast.success("SUCCESSFULLY Fetched weather", { theme: "dark" });
        setDatas(data);
      } else {
        toast.warn("Please Give location premission", { theme: "dark" });
      }
    } catch (error) {
      console.error("Error in callbylatlon:", error);
      toast.error("ERROR: Unable to fetch weather data. Please try again.", {
        theme: "dark",
      });
    }
  };

  const callbyname = async () => {
    try {
      if (city.length !== 0 && country.length !== 0) {
        const { data } = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
        );
        console.log("API Response by Name:", data);
        toast.success("SUCCESSFULLY Fetched weather", { theme: "dark" });
        setDatas(data);
        setCity("");
        setCountry("");
      } else {
        toast.warn("Please Enter Details !!", { theme: "dark" });
      }
    } catch (error) {
      console.error("Error in callbyname:", error);
      toast.error("ERROR: Unable to fetch weather data. Please try again.", {
        theme: "dark",
      });
    }
  };

  const location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  useEffect(() => {
    location();
  }, []);

  useEffect(() => {
    if (Object.keys(datas).length > 0) {
      setTemp(Math.ceil(datas.main?.temp - 273));
      setHumidity(datas.main?.humidity);
      setName(datas.name);
      setDescription(datas.weather[0].description);
      setWindspeed(datas.wind?.speed);
    }
  }, [datas]);

  return (
    <div>
      <div className="bg-black text-white p-3 lg:text-xl"> tru Weather</div>
      <div className="d-flex flex-column gap-2 mt-5 mx-2">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          className="w-10/12 p-2 rounded-lg mx-auto sm:w-8/12 md:w-6/12 lg:w-5/12"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Country Name"
          value={country}
          className="w-10/12 p-2 rounded-lg mx-auto sm:w-8/12 md:w-6/12 lg:w-5/12"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>
      <div className="mt-4 mx-2 d-flex flex-column">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-sm rounded-lg px-5 py-2.5 mb-2 focus:outline-none mx-auto"
          onClick={callbyname}
        >
          Get Tru Weather By City Name
        </button>
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 text-sm rounded-lg px-5 py-2.5 mx-auto mb-2 focus:outline-none"
          onClick={callbylatlon}
        >
          Get Tru Weather By Current Location
        </button>
      </div>
      {temp && <WeatherCard temp={temp} humidity={humidity} description={description} name={name} windspeed={windspeed} />}
      <ToastContainer />
    </div>
  );
};

export default App;
