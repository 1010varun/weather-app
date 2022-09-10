import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Input, Alert } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Navbarsite from "./components/Navbar";
import { Card, CardBody} from "reactstrap";
import {IoIosWater} from "react-icons/io"
import {BsWind, BsThermometerHalf} from "react-icons/bs"
import {BiMap} from "react-icons/bi"
import {FaSun} from "react-icons/fa"


const App = () => {

  const[latitude, setLatitude] = useState('');
  const[longitude, setLongitude] = useState('');
  const[city, setCity] = useState('');
  const[country, setCountry] = useState('');
  const[datas, setDatas] = useState({});
  const[temp, setTemp] = useState(0);
  const[humidity, setHumidity] = useState(0)
  const[description, setDescription] = useState(0)
  const[name, setName] = useState(0)
  const[windspeed, setWindspeed] = useState(0)
  

  const callbylatlon = async () => {
    const { data } = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9553eeffc4cfe23a2011d3fb64edc72`)
    setDatas(data);
  }

  const callbyname = async () => {
    if(city !== 0 && country !== 0){
      const {data} = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a9553eeffc4cfe23a2011d3fb64edc72`)
      setDatas(data);
    }
  }

  const location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);  
    })
  }

  useEffect(() => {
    location();
  }, []);

  useEffect(() => {
    if(Object.keys(datas).length > 0){
      setTemp(Math.ceil((datas.main?.temp)-273));
      setHumidity(datas.main?.humidity);
      setName(datas.name);
      setDescription(datas.weather[0].description);
      setWindspeed(datas.wind?.speed);
    }
  }, [datas])
  return(
    <div>
      <Navbarsite/>
      <Input type="text" placeholder="Enter City Name" value={city} className="city"
      onChange={e => {setCity(e.target.value)}}/>
      <Input type="text" placeholder="Enter Country Name" value={country} className="country"
      onChange={e => {setCountry(e.target.value)}}/><br></br>
      <Button color="success" onClick={callbyname} className="button">Get Tru Weather By City Name</Button>
      <Button color="primary" onClick={callbylatlon} className="button2">By Current Location</Button>
      <Card className="cards">
        <CardBody className="text-center mt-5">
        <div><BsThermometerHalf size={20}/> {temp} °C</div>
        <div><IoIosWater size={20}/> {humidity} %</div>
        <div><FaSun/> {description}</div>
        <div><BiMap/> {name}</div>
        <div><BsWind/> {windspeed}Km/h</div>
        </CardBody>
      </Card>
    </div>
  )

}


export default App;
