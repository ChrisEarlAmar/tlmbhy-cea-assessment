// Processes a single sensor event and returns a list of alerts (if any)
export function processSensorEvent(event, sensorState) {
  const { sensor_id, sensor_type, value, timestamp, location } = event;
  const alerts = [];

  const prevData = sensorState[sensor_id];

  if (sensor_type === "temperature") {
    if (prevData) {
      // sudden change >5°C within 2 min
      if (
        Math.abs(value - prevData.value) > 5 &&
        timestamp - prevData.timestamp < 2 * 60 * 1000
      ) {
        alerts.push({
          sensor_id,
          level: "CRITICAL",
          message: "Sudden temperature change detected",
          location,
          timestamp,
        });
      }
    }

    // out of comfort range for >10 min
    if (value < 18 || value > 26) {
      if (prevData && timestamp - prevData.timestamp > 10 * 60 * 1000) {
        alerts.push({
          sensor_id,
          level: "WARNING",
          message: "Temperature out of range for >10 min",
          location,
          timestamp,
        });
      }
    }
  }

  if (sensor_type === "motion") {
    const hour = new Date(timestamp).getHours();
    const day = new Date(timestamp).getDay(); // 0 = Sun

    // inactivity during 9–5
    if (
      prevData &&
      hour >= 9 &&
      hour <= 17 &&
      timestamp - prevData.timestamp > 30 * 60 * 1000
    ) {
      alerts.push({
        sensor_id,
        level: "INFO",
        message: "No motion detected for >30 min",
        location,
        timestamp,
      });
    }

    // unusual motion after 10pm weekdays
    if (hour >= 22 && day >= 1 && day <= 5) {
      alerts.push({
        sensor_id,
        level: "WARNING",
        message: "Unusual motion detected after 10PM",
        location,
        timestamp,
      });
    }
  }

  return alerts;
};