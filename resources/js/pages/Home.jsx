import { useState, useEffect } from "react";
import { formatAlertDate } from "../utils/dateHelpers";
import { processSensorEvent } from "../utils/alertProcessor";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import { useAtom } from "jotai";
import { eventsAtom, alertsAtom, sensorStateAtom } from "../store/atom";

const SensorEventsPanel = ({ events }) => {
  return (
    <Card
      variant="outlined"
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sensor Events
        </Typography>
        <Box
          sx={{
            maxHeight: 400,
            overflow: "auto",
            background: "#f4f4f4",
            p: 2,
            borderRadius: 2,
          }}
        >
          {events.length > 0 ? (
            events.slice(0, 50).map((event, index) => (
              <Box
                key={index}
                component="pre"
                sx={{
                  mb: 2,
                  p: 1,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  background: "#fff",
                  fontSize: "0.8rem",
                }}
              >
                {JSON.stringify(event, null, 2)}
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No events yet.</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const AlertsPanel = ({ alerts, formatTimestamp }) => {
  return (
    <Card
      variant="outlined"
      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Alerts
        </Typography>
        <Box
          sx={{
            flex: 1,
            maxHeight: 400,
            overflow: "auto",
            p: 2,
            borderRadius: 2,
          }}
        >
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  background: "#fff",
                }}
              >
                <Chip
                  label={alert.level}
                  color={
                    alert.level === "CRITICAL"
                      ? "error"
                      : alert.level === "WARNING"
                      ? "warning"
                      : "info"
                  }
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" component="span">
                  {alert.message}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Sensor: {alert.sensor_id} | Floor {alert.location?.floor},{" "}
                  {alert.location?.room}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Time: {formatTimestamp(alert.timestamp)}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              No alerts generated.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Home() {

  const [events, setEvents] = useAtom(eventsAtom);
  const [alerts, setAlerts] = useAtom(alertsAtom);
  const [sensorState, setSensorState] = useAtom(sensorStateAtom);

  return (
    <Box sx={{ width: "100%" }}>
 
      <Grid container justifyContent={'center'} alignContent={'center'} spacing={2} sx={{ height: "100%" }}>
        {/* Events Panel */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }} sx={{ height: '100%', display: "flex" }}>
          <SensorEventsPanel events={events} />
        </Grid> 
 
        {/* Alerts Panel */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }} sx={{ height: '100%', display: "flex" }}>
          <AlertsPanel alerts={alerts} formatTimestamp={formatAlertDate} />
        </Grid>
      </Grid>
    </Box>
  );
}
