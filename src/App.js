import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosWater } from "react-icons/io";
import { BsWind, BsThermometerHalf } from "react-icons/bs";
import { BiMap } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
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

    // const weatherURLs = {
    //   clearsky: 'https://t4.ftcdn.net/jpg/05/79/25/43/360_F_579254301_VQ75mtrG9AP45Txrd76TG2xatiBqqms2.jpg',
    //   partlycloudy: 'https://example.com/partly-cloudy-image.jpg',
    //   'rainy': 'https://example.com/rainy-image.jpg',
    //   'snowy': 'https://example.com/snowy-image.jpg',
    //   // Add more descriptions and URLs as needed
    // };

    const determineweatherurl=()=>{
      let imurl="https://png.pngtree.com/background/20230427/original/pngtree-clouds-above-a-bright-sky-picture-image_2494866.jpg";  // default value

      if(description.includes("clear")){ imurl="https://t4.ftcdn.net/jpg/05/79/25/43/360_F_579254301_VQ75mtrG9AP45Txrd76TG2xatiBqqms2.jpg"}
      if(description.includes("thunderstorm")){ imurl="https://img.freepik.com/premium-photo/thunderstorm-with-lightnings-stormy-sky-city-dramatic-weather-background-digital-illustrati_124507-12857.jpg"}
      if(description.includes("smoke")){ imurl="https://c0.wallpaperflare.com/preview/906/687/614/sky-clouds-nature-weather.jpg"}
      if(description.includes("drizzle")){ imurl="https://media.istockphoto.com/id/1429701799/photo/raindrops-on-asphalt-rain-rainy-weather-downpour.webp?b=1&s=170667a&w=0&k=20&c=lXXWPQuhXI4xZRrr8d1uZGjQasuR-oRS1_GraXO9Fd0="}
      if(description.includes("rain")){ imurl="https://img.freepik.com/free-photo/weather-effects-composition_23-2149853295.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704931200&semt=ais"}
      if(description.includes("snow")){ imurl="https://png.pngtree.com/background/20230525/original/pngtree-winter-scene-of-snow-covered-mountains-and-snowfall-picture-image_2729279.jpg"}
      if(description.includes("clouds")){ imurl="https://t4.ftcdn.net/jpg/05/79/25/43/360_F_579254301_VQ75mtrG9AP45Txrd76TG2xatiBqqms2.jpg"}
      if(description.includes("fog")){ imurl="https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      if(description.includes("haze")){ imurl="https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145827/globeindiasmog_lrg.jpg"}
      if(description.includes("mist")){ imurl="https://images.nationalgeographic.org/image/upload/v1638884972/EducationHub/photos/blue-mist.jpg"}
      if(description.includes("dust")){ imurl="https://www.aoa.org/AOA/Images/News_2020/dust-cloud900.jpg"}
      if(description.includes("sand")){ imurl="https://image.cnbcfm.com/api/v1/image/106849039-1614858338482-gettyimages-634465411-dsgf001080.jpeg?v=1614858433&w=1600&h=900"}
      if(description.includes("ash")){ imurl="http://i.cdn.turner.com/cnn/2011/WORLD/americas/06/19/chile.volcano/t1larg.chile.volanco.ash.afp.gi.jpg"}
      if(description.includes("squalls")){ imurl="https://www.weatherzone.com.au/news-thumbnail/2941205"}
      if(description.includes("tornado")){ imurl="https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
      // console.log("description:",description);
      // console.log("check:",description.includes("smoke"));
      // console.log("imurl:",imurl);
      return imurl;
    }

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
        
        const igurl=determineweatherurl();
        document.body.style.background = `#f3f3f3 url('${igurl}') no-repeat`;
        document.body.style.backgroundSize='cover';

    } else{
      return toast.warn("Please Give location premission", { theme: "dark" });
    }
  };

  const callbyname = async () => {
    if (city.length !== 0 && country.length !== 0) {
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      ).then(({data}) => {
        setDescription(data.weather[0].description || ""); // Ensure description is a string
        toast.success("SUCCESSFULLY Fetched weather", {theme: 'dark'})
        setDatas(data);
          setCity("");
          setCountry("");
      }).catch((err) => {
        toast.error("ERROR, Please check & try again", { theme: "dark" });
      })

      // const word=description.split(' ');
      // const word=description.split(' ');
      // console.log("Description:", description);
              // const word = description.split(' ');
// console.log("word",word);
      // console.log(word);
              // const lef = word.join('').toString();
      // console.log(lef);

              // const bgurl = weatherURLs[lef];
      // console.log("a",weatherURLs);
      // console.log("b",weatherURLs.lef);
   
              // document.body.style.background = `#f3f3f3 url('${bgurl}') no-repeat`;
              // document.body.style.backgroundSize='cover';
              // console.log("Heeeelo");
              // console.log("bgurl",bgurl);

        const igurl=determineweatherurl();
        document.body.style.background = `#f3f3f3 url('${igurl}') no-repeat`;
        document.body.style.backgroundSize='cover';

    } else{
      return toast.warn("Please Enter Details !!",{theme: "dark"});
    }
  };

  const handleKeyStroke= (e) => {
    if (e.keyCode === 13) {
      callbyname();
    }
  };

  useEffect(() => {
    if (description) {
      // const word = description.split(' ');
      // console.log(word);
  
      // const bgurl = weatherURLs[word.join('').toLowerCase()] || weatherURLs.default; // Use a default URL if not found
      document.body.style.background = `#f3f3f3 url('${determineweatherurl(description)}') no-repeat`;
      // console.log("bgurl", bgurl);
              document.body.style.backgroundSize='cover';

    }
  }, [description]);

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
    <div className="w-screen h-screen overflow-hidden">
      <div className="bg-black text-white p-3 lg:text-xl"> tru Weather</div>
      <div className="d-flex flex-column gap-2 mt-5 mx-2">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          className="w-10/12 p-2 rounded-lg mx-auto sm:w-8/12 md:w-6/12 lg:w-5/12"
          onKeyDown={handleKeyStroke}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Country Name"
          value={country}
          className="w-10/12 p-2 rounded-lg mx-auto sm:w-8/12 md:w-6/12 lg:w-5/12"
          onKeyDown={handleKeyStroke}
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
  {!!temp &&
     <div className="block w-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md mx-64 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-5 d-flex flex-row justify-center items-center sm:w-6/12 md:w-4/12 lg:w-3/12 mb-5">
     <p className="d-flex flex-row mr-3">
       <BsThermometerHalf size={20} className="me-3" /> {temp} °C 
     </p>
     <p className="d-flex flex-row mr-3">
       <IoIosWater size={20} className="me-3" /> {humidity} %
     </p>
     <p className="d-flex flex-row mr-3">
       <FaSun className="me-3" size={20} /> {description}
     </p>
     <p className="d-flex flex-row mr-3">
       <BiMap className="me-3" size={20} /> {name}
     </p>
     <p className="d-flex flex-row">
       <BsWind className="me-3" size={20} /> {windspeed}Km/h
     </p>
   </div>
   
  }
      <ToastContainer/>
      <Footer />
    </div>
  );
};

export default App;
