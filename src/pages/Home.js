import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/Home.css'

const Home = () => {
  return (
    <div className='home-container'>
      <Row>
        <Col>
          <h1 className='home-title'>Empowering Partenership.</h1>
          <div className='home-decorative-line'></div>
          <span className='home-subtitle'>Inspired by impact.com</span>
        </Col>
      </Row>
    </div>
  );
};

export default Home;