import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import readline from "readline";

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const __dirname = dirname(currentFilePath);

const instructionsFilePath = path.join(__dirname, "/instructions.txt");

const routerCheckup = (req, res) => {
	res.send("Router and Controller Working!");
};

const readInstructionsFile = (req, res) => {
	try {
		if (fs.existsSync(instructionsFilePath)) {
			const fileStream = fs.createReadStream(instructionsFilePath);
			const rl = readline.createInterface({
				input: fileStream,
				crlfDelay: Infinity, // To recognize all line-ending types ('\n', '\r\n', etc.)
			});
			let index = 0;
			rl.on("line", (line) => {
				// Process each line here
				console.log(`Line ${++index}:`, line);
			});
			rl.on("close", () => {
				console.log("File reading completed.");
			});

			res.send("File Reading!");
		} else {
			res.status(500).send("File not found!");
		}
	} catch (err) {
		console.error(err);
		res.status(500).send("Error encountered while reading file!");
	}
};

const fillRegisterFile = (registerFile) => {
	for (let i = 0; i < 32; i++) {
		registerFile[`R${i}`] = {
			value: 0,
			Qi: 0,
		};
		registerFile[`F${i}`] = {
			value: 0,
			Qi: 0,
		};
	}
};

const fillReservationStationsAndBuffers = (type, count, reservationStation) => {
	for (let i = 1; i <= count; i++) {
		reservationStation[`${type}${i}`] = {
			busy: 0,
			op: "",
			Vj: 0,
			Vk: 0,
			Qj: 0,
			Qk: 0,
			Time: 0,
			A: 0,
		};
	}
};

const parseInstruction = (str) => {
	const li = str.split(" ");
	switch (li[0].toLowerCase()) {
		case "addi":
			return ["A", AddI(li[3]), li[1], li[2], li[3]];
		case "add":
			return ["A", Add(), li[1], li[2], li[3]];
		case "sub":
			return ["A", Sub(), li[1], li[2], li[3]];
		case "mul":
			return ["M", Mul(), li[1], li[2], li[3]];
		case "div":
			return ["M", Div(), li[1], li[2], li[3]];
		case "bnez":
			return ["A", Bnez(), null, li[1], li[2]];
		case "l.d":
			return ["L", Load(), null, li[1], li[2]];
		case "s.d":
			return ["S", Store(), null, li[1], li[2]];
		default:
			break;
	}
};

const AddI = (val) => {
	return {
		busy: 1,
		op: "addi",
		Vj: 0,
		Vk: parseInt(val),
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Add = () => {
	return {
		busy: 1,
		op: "add",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Sub = () => {
	return {
		busy: 1,
		op: "sub",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Mul = () => {
	return {
		busy: 1,
		op: "mul",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Div = () => {
	return {
		busy: 1,
		op: "div",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Bnez = () => {
	return {
		busy: 1,
		op: "bnez",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Load = () => {
	return {
		busy: 1,
		op: "load",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const Store = () => {
	return {
		busy: 1,
		op: "store",
		Vj: 0,
		Vk: 0,
		Qj: 0,
		Qk: 0,
		Time: 1,
		A: 0,
	};
};

const checkSpaceInReservationStation = (reservationStation, registerFile, ins) => {
	let foundSpace = false;
	let [type, instruction, reg1, reg2, reg3] = ins;
	Object.entries(reservationStation).map((key, value) => {
		if (value["busy"] === 0) {
			if (foundSpace) return undefined;
			fillInstruction(reg2, "j", regitserFile, instruction);
			fillInstruction(reg3, "k", regitserFile, instruction);
			reservationStation[key] = instruction;
			foundSpace = true;
			if (!reg1) {
				registerFile[reg1]["Qi"] = key;
			}
		}
		return undefined;
	});
	return foundSpace;
};
const fillInstruction = (reg, place, registerFile, instruction) => {
	if (registerFile[reg]["Qi"] !== 0) {
		instruction[`Q${place}`] = registerFile[reg]["Qi"];
	} else {
		instruction[`V${place}`] = registerFile[reg]["value"];
	}
};
const checkSpaceInBuffers = (loadBuffers, storeBuffers, registerFile, cache, ins) => {
	let [type, instruction, reg1, reg2, reg3] = ins;
};
export {
	routerCheckup,
	readInstructionsFile,
	fillRegisterFile,
	fillReservationStationsAndBuffers,
	parseInstruction,
	checkSpaceInReservationStation,
	checkSpaceInBuffers,
};
