import React from "react";
import { Card, CardBody, CardText, Col, CardHeader } from "react-bootstrap";
import { FaTemperatureHigh, FaTemperatureLow, FaUmbrella } from 'react-icons/fa';

const WeeklyCard = ({ dayData }) => {
    const getDayOfWeek = (date) => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = new Date(date).getDay();
        return daysOfWeek[day];
      };
    
      return (
        <Col xs={12} md={4} className="mb-4">
          <Card className='mb-3 h-100 card-weather border-primary shadow-none'>
            <CardHeader className="bg-primary d-flex justify-content-between align-items-center text-light">
              {getDayOfWeek(dayData.date)}
              <img src={dayData.day.condition.icon} alt="weather icon" />
            </CardHeader>
            <CardBody>
              <CardText>
                <FaTemperatureHigh className="me-1" /> {dayData.day.maxtemp_c}°C
              </CardText>
              <CardText>
                <FaTemperatureLow className="me-1" /> {dayData.day.mintemp_c}°C
              </CardText>
              <CardText>
                <FaUmbrella className="me-1" /> {dayData.day.daily_chance_of_rain}%
              </CardText>
            </CardBody>
          </Card>
        </Col>
      );
    }
    
    export default WeeklyCard;
