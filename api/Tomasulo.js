import {
	fillRegisterFile,
	fillReservationStationsAndBuffers,
	parseInstruction,
	checkSpaceInReservationStation,
	checkSpaceInBuffers,
} from "./controller.js";

const registerFile = {};
const addSubReservationStation = {};
const loadBuffers = {};
const storeBuffers = {};
const multDivReservationStation = {};
const instructions = ["Addi F5 F5 8", "Addi F1 F2 3", "Sub F6 F5 F1"];
const cache = new Array(1024).fill(0);

const determineReservationStationIfPossible = (ins) => {
	let [type, instruction, reg1, reg2, reg3] = ins;
	switch (type) {
		case "A":
			return checkSpaceInReservationStation(addSubReservationStation, registerFile, ins);
		case "M":
			return checkSpaceInReservationStation(multDivReservationStation, registerFile, ins);
		case "L":
			return checkSpaceInBuffers(loadBuffers, storeBuffers, registerFile, cache, ins);
		case "S":
			return checkSpaceInBuffers(storeBuffers, storeBuffers, registerFile, cache, ins);
	}
};

fillRegisterFile(registerFile);
fillReservationStationsAndBuffers("A", 3, addSubReservationStation);
fillReservationStationsAndBuffers("M", 3, multDivReservationStation);
fillReservationStationsAndBuffers("L", 3, loadBuffers);
fillReservationStationsAndBuffers("S", 3, storeBuffers);

for (let i = 0; i < instructions.length; i++) {
	determineReservationStationIfPossible(parseInstruction(instructions[i]));
}

console.log(multDivReservationStation);
console.log(addSubReservationStation);
console.log(loadBuffers);
console.log(storeBuffers);
console.log(registerFile);
