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
			return AddI(li[3]);
		case "add":
			return Add();
		case "sub":
			return Sub();
		case "mul":
			return Mul();
		case "div":
			return Div();
		case "bnez":
			return Bnez();
		default:
			break;
	}
};

const AddI = (val) => {
	return {
		busy: 1,
		op: "addi",
		Vj: 0,
		Vk: val,
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

const mul = () => {
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

export {
	routerCheckup,
	readInstructionsFile,
	fillRegisterFile,
	fillReservationStationsAndBuffers,
	parseInstruction,
};
