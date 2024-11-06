import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Form, Button, InputGroup, ListGroup, Row } from 'react-bootstrap';
import CurrentCard from './components/CurrentCard';
import WeeklyCard from './components/WeeklyCard';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const API_URL = process.env.REACT_APP_WEATHER_API_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("");

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const url = `${API_URL}search.json?key=${API_KEY}&q=${query}`;
    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast.error("Failed to fetch suggestions.");
    }
  };

  async function searchCity(selectedCity) {
    const url = `${API_URL}forecast.json?key=${API_KEY}&q=${selectedCity}&days=3&aqi=no&alerts=no&lang=es`;
    try {
      const response = await axios.get(url);
      if (response.data && response.data.location) {
        setData(response.data);
        setCity("");
        setSuggestions([]);
      } else {
        setData(null);
        toast.error("Location not found. Please try another city.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching the weather data.");
    }
  }
  return (
    <div className="App">
      <Navbar/>
      <div className='container'>
      <div className="my-3">
        <InputGroup className="mb-3" id='search'>
          <Form.Control
            placeholder="Enter city"
            aria-label="Enter city"
            value={city}
            onChange={(e) => { setCity(e.target.value); fetchSuggestions(e.target.value); }}
          />
          <Button variant="primary" id="button-addon2" onClick={() => searchCity(city)}>
            Search
          </Button>
        </InputGroup>
        <ListGroup>
        {suggestions.map((suggestion, index) => (
          <ListGroup.Item key={index} action onClick={() => searchCity(suggestion.name)}>
            {suggestion.name}, {suggestion.region}, {suggestion.country}
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
      <ToastContainer />
      {data && (
        <CurrentCard data={data} />
      )}

      {data && data.forecast && data.forecast.forecastday && (
        <Row className='row-cols-1 row-cols-md-3 g-3 justify-content-evenly'>
          {data.forecast.forecastday.slice(1).map((day, index) => (
            <WeeklyCard key={index} dayData={day} />
          ))}
        </Row>
      )}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
