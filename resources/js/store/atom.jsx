import { atom } from 'jotai';

export const pingerIdsAtom = atom([]); // existing IDs
export const pingingStateAtom = atom({}); // { [id]: true/false }

export const eventsAtom = atom([]);
export const alertsAtom = atom([]);
export const sensorStateAtom = atom({});

export const isLoggingOutAtom = atom(false);

