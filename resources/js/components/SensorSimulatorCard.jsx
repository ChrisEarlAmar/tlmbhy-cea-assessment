// SensorSimulatorCard.jsx
import { useEffect, useRef } from "react";
import { Card, CardContent, CardActions, Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import { useRandomSensorEvent } from "../utils/useRandomSensorEvent";

export default function SensorSimulatorCard({ id, isPinging, setIsPinging, onRemove }) {
  const getRandomEvent = useRandomSensorEvent();
  const intervalRef = useRef(null);

  const sendEvent = async () => {
    const event = getRandomEvent();
    try {
      await axios.post("/api/sensor/event", event);
      // console.log("Sent sensor event:", event);
    } catch (err) {
      // console.error("Failed to send sensor event:", err);
    }
  };

  const startPinging = () => {
    setIsPinging(true);
  };

  const stopPinging = () => {
    setIsPinging(false);
  };

  // Handle starting/stopping interval based on external isPinging state
  useEffect(() => {
    if (isPinging && !intervalRef.current) {
      intervalRef.current = setInterval(sendEvent, 2000);
    } else if (!isPinging && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPinging]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sensor #{id}
        </Typography>
        <Typography variant="body2">
          {isPinging ? "Dispatching sensor events..." : "Press start to send random sensor events"}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={isPinging ? stopPinging : startPinging}
            variant="contained"
            color={isPinging ? "error" : "primary"}
          >
            {isPinging ? "Stop" : "Start"}
          </Button>
          <Button onClick={onRemove} variant="outlined" color="secondary">
            Remove
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
