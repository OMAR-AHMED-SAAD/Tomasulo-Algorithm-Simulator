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
    }
    else {
        res.status(500).send("File not found!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error encountered while reading file!");
  }
};

export { routerCheckup, readInstructionsFile };
