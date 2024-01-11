import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosWater } from "react-icons/io";
import { BsWind, BsThermometerHalf } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSpring, animated, config } from "react-spring";

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
  const [cardColor, setCardColor] = useState('#ff7e5f'); // Default color

  const callbylatlon = async () => {
    if (latitude.length !== 0 && longitude.length !== 0) {
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
    } else {
      return toast.warn("Please Give location premission", { theme: "dark" });
    }
  };

  const callbyname = async () => {
    if (city.length !== 0 && country.length !== 0) {
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      )
        .then(({ data }) => {
          toast.success("SUCCESSFULLY Fetched weather", { theme: "dark" });
          setDatas(data);
          setCity("");
          setCountry("");
        })
        .catch((err) => {
          toast.error("ERROR, Please check & try again", { theme: "dark" });
        });
    } else {
      return toast.warn("Please Enter Details !!", { theme: "dark" });
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

      // Change card color based on temperature
      if (temp >= 30) {
        setCardColor('#ff7e5f'); // Hot temperature color
      } else if (temp >= 20) {
        setCardColor('#fdb23d'); // Moderate temperature color
      } else {
        setCardColor('#4ab1eb'); // Cold temperature color
      }
    }
  }, [datas, temp]);

  // Create a spring for the card animation
  const cardSpring = useSpring({
    opacity: temp ? 1 : 0,
    transform: `scale(${temp ? 1 : 0.8})`,
    from: { opacity: 0, transform: 'scale(0.8)' },
    config: config.wobbly,
  });

  const fadeSpring = useSpring({
    opacity: temp ? 1 : 0,
    from: { opacity: 0 },
    config: config.molasses,
  });

  const slideInFromBottom = useSpring({
    opacity: temp ? 1 : 0,
    transform: `translateY(${temp ? 0 : 20}px)`,
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: config.gentle,
  });

  const rotateSpring = useSpring({
    opacity: temp ? 1 : 0,
    transform: `rotate(${temp ? 0 : 45}deg)`,
    from: { opacity: 0, transform: 'rotate(-45deg)' },
  });

  return (
    <div>
      <div className="bg-black text-white p-3 lg:text-xl">tru Weather</div>
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

      {temp && (
        <animated.div
          style={{
            ...cardSpring,
            ...slideInFromBottom,
            ...rotateSpring,
            background: `linear-gradient(to right, ${cardColor}, #feb47b)`,
          }}
          className="block w-9/12 p-6 border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto mt-5 d-flex flex-column justify-center items-center sm:w-6/12 md:w-4/12 lg:w-3/12 mb-5"
        >
          <animated.p style={fadeSpring} className="d-flex flex-row text-white">
            <BsThermometerHalf size={20} className="me-3" /> {temp} °C
          </animated.p>
          <animated.p style={fadeSpring} className="d-flex flex-row text-white">
            <IoIosWater size={20} className="me-3" /> {humidity} %
          </animated.p>
          <animated.p style={fadeSpring} className="d-flex flex-row text-white">
            <FaSun className="me-3" size={20} /> {description}
          </animated.p>
          <animated.p style={fadeSpring} className="d-flex flex-row text-white">
            <BiMap className="me-3" size={20} /> {name}
          </animated.p>
          <animated.p style={fadeSpring} className="d-flex flex-row text-white">
            <BsWind className="me-3" size={20} /> {windspeed}Km/h
          </animated.p>
        </animated.div>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
