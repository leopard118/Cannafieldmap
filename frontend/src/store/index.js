import { atom, createStore } from "jotai";

const selectedPieces = atom([]);
const panstate = atom(false);
const store = createStore();
const selectedNum = atom(0);
export { selectedPieces, panstate, store, selectedNum };
