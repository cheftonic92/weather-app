import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaWind, FaTint, FaSun, FaMoon } from 'react-icons/fa';

const CurrentCard = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  const formatXAxis = (tickItem) => {
    return tickItem.split(' ')[1]; 
  };

  return (
    <Container>
      <Card className="mb-3 current-card border-primary shadow-none">
        <Card.Header className=" bg-primary">
          <h1>{data.location.name}</h1>
        </Card.Header>
        <Card.Body>
          <Row className='g-2'>
            <Col md='3' className="d-flex flex-column align-items-center">
              <div>
                  <div className="d-flex flex-row mb-4 align-items-center">
                    {data.current && <h2>{data.current.temp_c.toFixed()}°C</h2>}
                    <img src={data.current.condition.icon} alt="weather icon" />
                  </div>
                  <Card.Text className="mb-4">
                    
                  </Card.Text>
                  <div className="info">
                    <Col>
                      <Row  className="d-flex mb-2 align-items-center row row-cols-2">
                        <FaWind className="me-1" /> {data.current.wind_kph}km/h
                      </Row>
                      <Row  className="d-flex mb-2 align-items-center row row-cols-2">
                        <FaTint className="me-1" /> {data.current.humidity}%
                      </Row>
                      <Row  className="d-flex mb-2 align-items-center row row-cols-2">
                        <FaSun className="me-1" /> {data.forecast.forecastday[0].astro.sunrise}
                      </Row>
                      <Row  className="d-flex mb-2 align-items-center row row-cols-2">
                        <FaMoon className="me-1" /> {data.forecast.forecastday[0].astro.sunset}
                      </Row>
                    </Col>
              </div>
              </div>
            </Col>
            <Col md='9'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.forecast.forecastday[0].hour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatXAxis}/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="temp_c" fill="#A8DADC" name="Today's Temp Cº" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className='bg-primary'>
          {data.current.last_updated}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default CurrentCard;
