import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaTemperatureHigh, FaTemperatureLow, FaUmbrella, FaWind } from 'react-icons/fa';

const WeeklyCard = ({ dayData }) => {
  const getDayOfWeek = (date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(date).getDay();
    return daysOfWeek[day];
  };
  
  return (
    <Col xs={12} md={4} className="mb-4">
      <Card className="h-100 current-card ">
        <Card.Header className="d-flex justify-content-between align-items-center p-3">
          <h5 className="mb-0">{getDayOfWeek(dayData.date)}</h5>
          <img src={dayData.day.condition.icon} alt="weather icon" style={{ width: "40px" }} />
        </Card.Header>
        <Card.Body className="weekly-body">
          <Row>
            <Col xs={6} className="d-flex align-items-center mb-2">
              <FaTemperatureHigh className="me-2" /> {dayData.day.maxtemp_c}°C
            </Col>
            <Col xs={6} className="d-flex align-items-center mb-2">
              <FaTemperatureLow className="me-2" /> {dayData.day.mintemp_c}°C
            </Col>
            <Col xs={6} className="d-flex align-items-center mb-2">
              <FaUmbrella className="me-2" /> {dayData.day.daily_chance_of_rain}%
            </Col>
            <Col xs={6} className="d-flex align-items-center mb-2">
              <FaWind className="me-2" /> {dayData.day.avgvis_km} km/h
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WeeklyCard;
