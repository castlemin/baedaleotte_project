import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [GPS, setGPS] = useState({});
  const handleSubmit = () => {};

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGPS({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          });
        },
        (error) => {
          if (error.code === 1) {
            navigate('/');
          }
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      console.log('GPS 차단 됨');
    }
  };
  getLocation();

  console.log(GPS);

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};

export default ServiceStartPage;
