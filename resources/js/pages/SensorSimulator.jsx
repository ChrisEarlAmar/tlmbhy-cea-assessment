import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { Button, Box, Grid } from "@mui/material";
import SensorSimulatorCard from "../components/SensorSimulatorCard";
import { pingerIdsAtom, pingingStateAtom } from '../store/atom';
import { useAtom } from 'jotai';

const SensorSimulator = () => {

  const { user } = useAuth();

  const [pingerIds, setPingerIds] = useAtom(pingerIdsAtom);
  const [pingingState, setPingingState] = useAtom(pingingStateAtom);

  const addPinger = () => {
    const newId = Date.now();
    setPingerIds((prev) => [...prev, newId]);
    setPingingState((prev) => ({ ...prev, [newId]: false })); // initialize pinging state
  };

  const removePinger = (id) => {
    setPingerIds((prev) => prev.filter((pingerId) => pingerId !== id));
    setPingingState((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const setIsPinging = (id, value) => {
    setPingingState((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button variant="contained" onClick={addPinger} sx={{ mb: 2 }}>
        Add Sensor Simulator
      </Button>

      <Grid container justifyContent={'start'} alignContent={'center'} spacing={2}>
        {pingerIds.map((id) => (
          <Grid key={id} size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 3 }} >
            <SensorSimulatorCard
              id={id}
              isPinging={pingingState[id] || false}
              setIsPinging={(value) => setIsPinging(id, value)}
              onRemove={() => removePinger(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

};

export default SensorSimulator;