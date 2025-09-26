import { useEffect } from "react";
import { useAtom } from "jotai";
import { eventsAtom, alertsAtom, sensorStateAtom } from "../store/atom";
import { processSensorEvent } from "../utils/alertProcessor";

const useSensorEvents = () => {
  const [, setEvents] = useAtom(eventsAtom);
  const [alerts, setAlerts] = useAtom(alertsAtom);
  const [sensorState, setSensorState] = useAtom(sensorStateAtom);

  const addAlert = (alert) => {
    const now = Date.now();
    const lastAlert = alerts.find(
      (a) => a.sensor_id === alert.sensor_id && now - a.timestamp < 5 * 60 * 1000
    );
    if (lastAlert) return;
    setAlerts((prev) => [alert, ...prev]);
  };

  const handleEvent = (event) => {
    // update events log
    setEvents((prev) => [event, ...prev]);

    // update sensor state
    setSensorState((prev) => {
      const prevData = prev[event.sensor_id] || {};
      return {
        ...prev,
        [event.sensor_id]: {
          ...prevData,
          value: event.value,
          timestamp: event.timestamp,
        },
      };
    });

    // process alerts
    const newAlerts = processSensorEvent(event, sensorState);
    newAlerts.forEach(addAlert);
  };

  useEffect(() => {
    const channel = window.Echo.channel("sensor-event");

    const listener = (e) => {
      const { data } = e;
      handleEvent(data);
    };

    channel.listen(".SensorEvent", listener);

    return () => {
      channel.stopListening(".SensorEvent", listener);
      window.Echo.leave("sensor-event");
    };
  }, [sensorState]); // sensorState is used for comparison
};

export default useSensorEvents;
