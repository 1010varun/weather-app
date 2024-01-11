import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosWater } from "react-icons/io";
import { BsWind, BsThermometerHalf } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
 
import Toggle from './Toggle';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = (value) => {
    setIsDarkMode(value);
  };

  const callbylatlon = async () => {
    if(latitude.length !== 0 && longitude.length !== 0){
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      )
        .then(({ data }) => {
          toast.success("SUCCESSFULLY Fetched weather", { theme: "dark" });
          setDatas(data);
        })
        .catch(() => {
          toast.error("ERROR, Please check & try again", { theme: "dark" });
        });
    } else{
      return toast.warn("Please Give location premission", { theme: "dark" });
    }
  };

  const callbyname = async () => {
    if (city.length !== 0 && country.length !== 0) {
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      ).then(({data}) => {
        toast.success("SUCCESSFULLY Fetched weather", {theme: 'dark'})
        setDatas(data);
          setCity("");
          setCountry("");
      }).catch((err) => {
        toast.error("ERROR, Please check & try again", { theme: "dark" });
      })
    } else{
      return toast.warn("Please Enter Details !!",{theme: "dark"});
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
  
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className={`bg-${isDarkMode ? 'black' : 'white'} text-white p-3 lg:text-xl d-flex`}> <span style={{color:'red',fontWeight:'600'}}>tru Weather</span> <Toggle onToggle={handleToggle}  /> </div>
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
  {temp &&
      <div className="block w-9/12 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto mt-5 d-flex flex-column justify-center items-center sm:w-6/12 md:w-4/12 lg:w-3/12 mb-5">
        <p className="d-flex flex-row">
          <BsThermometerHalf size={20} className="me-3" /> {temp} °C
        </p>
        <p className="d-flex flex-row">
          <IoIosWater size={20} className="me-3" /> {humidity} %
        </p>
        <p className="d-flex flex-row">
          <FaSun className="me-3" size={20} /> {description}
        </p>
        <p className="d-flex flex-row">
          <BiMap className="me-3" size={20} /> {name}
        </p>
        <p className="d-flex flex-row">
          <BsWind className="me-3" size={20} /> {windspeed}Km/h
        </p>
      </div>
  }
      <ToastContainer/>
    </div>
  );
};

export default App;
