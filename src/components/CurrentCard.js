import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    <Container className="my-4">
      <Card className="current-card border-0">
        <Card.Header className="text-center p-3">
          <h2 className="mb-0">{data.location.name}</h2>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="d-flex flex-column align-items-center">
              <div className="d-flex flex-row align-items-center mb-3">
                {data.current && <h2 className="mb-0 me-2">{data.current.temp_c.toFixed()}°C</h2>}
                <img src={data.current.condition.icon} alt="weather icon" style={{ width: '50px' }} />
              </div>
              <div className="info">
  <Row className="g-2">
    <Col xs={6} className="d-flex align-items-center">
      <FaWind className="me-2" /> {data.current.wind_kph} km/h
    </Col>
    <Col xs={6} className="d-flex align-items-center">
      <FaTint className="me-2" /> {data.current.humidity}%
    </Col>
    <Col xs={6} className="d-flex align-items-center">
      <FaSun className="me-2" /> {data.forecast.forecastday[0].astro.sunrise}
    </Col>
    <Col xs={6} className="d-flex align-items-center">
      <FaMoon className="me-2" /> {data.forecast.forecastday[0].astro.sunset}
    </Col>
  </Row>
</div>
            </Col>
            <Col md={8}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.forecast.forecastday[0].hour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={formatXAxis} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="temp_c" fill="#FFC4A3" name="Today's Temp Cº" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          Actualizado: {data.current.last_updated}
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default CurrentCard;
