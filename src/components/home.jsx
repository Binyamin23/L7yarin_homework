import axios from 'axios'
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './home.css'

const Home = () => {

  const [images, setImages] = useState([
    "./images/clearSky.jpg",
    "./images/clouds.jpg",
    "./images/graySky.jpg",
    "./images/rain.jpg"
  ])

  const [counter, setCounter] = useState(4)

  const check = () => {
    if (data.weather.temp <= 0) {
      setCounter(2)
    }
    else {
      if (data.weather.temp > 0 && data.weather.temp <= 10) {
        setCounter(3)
      }
      else {
        if (data.weather.temp > 10 && data.weather.temp <= 20) {
          setCounter(1)
        }
        else {
          setCounter(0);
        }
      }
    }
  }


  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const inputRef = useRef()
  const nav = useNavigate()
  const [query] = useSearchParams()
  const doApi = async () => {
    // setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query.get('city') || "paris"}&appid=d0d8c5d729e1c933561e0d4771b75b74&units=metric`
    const { data } = await axios(url);
    const obj = {
      location: {
        city: data.name,
        country: data.sys.country,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      },
      weather: {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        desc: data.weather[0].description
      },
      coord: {
        lon: data.coord.lon,
        lat: data.coord.lat
      }
    }
    console.log(obj);
    setData(obj)
    setLoading(false)
  }

  useEffect(() => {
    console.log(query.get('city'));
    doApi();
  }, [query])
  return (
    <div className='d-flex flex-column align-items-center py-5'>
      <div className='d-flex'>
        <input ref={inputRef} className='form-control' type="text" />
        <button onClick={() => {
          nav('?city=' + inputRef.current.value);

        }} className='mx-2 btn btn-primary'>Search</button>
      </div>

      {loading ? <h1>Loading...</h1> :
        <div>
          <h2 className='mt-2'>City: <span style={{ color: "red" }}>{data.location.city} </span></h2>
          <div className='d-flex'>
            <h2>Temp: <span style={{ color: "red" }}>{data.weather.temp}</span></h2>
          </div>
          
          <h2>Desc: <span style={{ color: "red" }}>{data.weather.desc}</span></h2>
          <button onClick={check} id='id_button'>try me</button>
          <img src={images[counter]} width={"300px"} height={"300px"} className='mt-2' alt="" />
        </div>
      }


    </div>
  )
}

export default Home