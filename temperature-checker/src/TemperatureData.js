// src/TemperatureData.js
import firebaseApp from './firebase';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './TemperatureData.css'; // Import the CSS file

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebaseApp);

    const fetchData = () => {
      const tempsRef = ref(database, 'temps');
      onValue(tempsRef, (snapshot) => {
        const tempData = snapshot.val();
        const dataArray = [];
        for (const timestamp in tempData) {
          if (tempData.hasOwnProperty(timestamp)) {
            const { humidity, temp } = tempData[timestamp];
            dataArray.push({ timestamp: parseInt(timestamp, 10), humidity, temp });
          }
        }
        setData(dataArray);
      });
    };

    fetchData();

    return () => {
      // Cleanup function
      // Remove any listeners or clean up resources as needed
    };
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const chartData = {
    labels: data.map(entry => formatDate(entry.timestamp)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(entry => entry.temp),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Humidity',
        data: data.map(entry => entry.humidity),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature and Humidity Data',
      },
    },
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Temperature and Humidity Data</h2>
      </div>
      <img src="/temperature.png" alt="Temperature Icon" className="icon" />
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TemperatureData;
