// src/TemperatureChecker.js
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import TemperatureData from './TemperatureData';
import firebaseApp from './firebase';

const database = getDatabase(firebaseApp);

const TemperatureChecker = () => {
  const [temperatures, setTemperatures] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const temperatureRef = ref(database, 'temps');
      onValue(temperatureRef, (snapshot) => {
        const tempData = snapshot.val();
        console.log(tempData)
        
        const tempArray = [];
        for (const key in tempData) {
          if (tempData.hasOwnProperty(key)) {
            tempArray.push({ id: key, ...tempData[key] });
          }
        }
        setTemperatures(tempArray);
      });
    };
    fetchData();
  }, [database]);

  return (
    <div>
     
      <TemperatureData/>
    </div>
  );
};

export default TemperatureChecker;
