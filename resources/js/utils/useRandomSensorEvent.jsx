import { useCallback } from "react";

// Sample rooms and sensor types
const rooms = ["conference_a", "conference_b", "lobby", "office_101", "office_102", "pantry", "hallway"];
const sensorTypes = ["temperature", "humidity", "motion", "air_quality", "noise_level"];

// Abbreviations mapping
const sensorAbbr = {
  temperature: "tmp",
  humidity: "hmd",
  motion: "mot",
  air_quality: "aqi",
  noise_level: "nsl",
};

function getRandomFloat(min, max, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a single random sensor event
function generateRandomSensorEvent() {
  const room = rooms[getRandomInt(0, rooms.length - 1)];
  const floor = getRandomInt(1, 5); // random floors 
  const sensorType = sensorTypes[getRandomInt(0, sensorTypes.length - 1)];

  let value;
  switch (sensorType) {
    case "temperature":
      value = getRandomFloat(15, 30);
      break;
    case "humidity":
      value = getRandomFloat(30, 70);
      break;
    case "motion":
      value = Math.random() > 0.5 ? 1 : 0;
      break;
    case "air_quality":
      value = getRandomFloat(0, 200);
      break;
    case "noise_level":
      value = getRandomFloat(30, 100);
      break;
    default:
      value = null;
  }

  return {
    sensor_id: `${sensorAbbr[sensorType]}_${room}_${floor}`, 
    sensor_type: sensorType,
    value,
    timestamp: Date.now(),
    location: { floor, room },
  };
};

// Hook
export function useRandomSensorEvent() {
  const getEvent = useCallback(() => {
    return generateRandomSensorEvent();
  }, []);

  return getEvent;
};