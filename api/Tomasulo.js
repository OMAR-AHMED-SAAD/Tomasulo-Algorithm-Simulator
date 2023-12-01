import {
	fillRegisterFile,
	fillReservationStationsAndBuffers,
	parseInstruction,
} from "./controller.js";

const registerFile = {};
const addSubReservationStation = {};
const loadBuffers = {};
const storeBuffers = {};
const multDivReservationStation = {};
const instructions = ["Addi F5 F5 8", "Addi F1 F2 3", "Sub F6 F5 F1"];

fillRegisterFile(registerFile);
fillReservationStationsAndBuffers("A", 3, addSubReservationStation);
fillReservationStationsAndBuffers("M", 3, multDivReservationStation);
fillReservationStationsAndBuffers("L", 3, loadBuffers);
fillReservationStationsAndBuffers("S", 3, storeBuffers);

for (let i = 0; i < instructions.length; i++) {
	addSubReservationStation[`A${i + 1}`] = parseInstruction(instructions[i]);
}

console.log(multDivReservationStation);
console.log(addSubReservationStation);
console.log(loadBuffers);
console.log(storeBuffers);
console.log(registerFile);
