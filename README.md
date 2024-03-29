# Tomasulo Algorithm Simulator

This project implements a simulator for the Tomasulo algorithm, allowing step-by-step execution of MIPS instructions. It handles various instruction types, hazards (RAW, WAR, WAW), reservation stations, buffers, register files, caches, and branching instructions like BNEZ. The user can input MIPS instructions, set instruction latencies, station/buffer sizes, and load initial cache/register file values.

## Technologies Used

- **Client**: React
- **API**: Node.js
- **Simulation Logic**: JavaScript
- **Hosting**: GitHub

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/tomasulo-simulator.git
cd tomasulo-simulator
```

# Install client dependencies

```bash
cd client
npm install
```

# Install API dependencies

```bash
  cd ../api
  npm install
```

# Running the Application

## Start the API:

```bash
cd api
npm start
```

The API server will run on http://localhost:5000.

## Start the client:

```bash
cd client
npm start
```

Open your browser and navigate to http://localhost:3000 to access the simulator.

# Usage

Upon accessing the simulator in the browser, you'll be presented with a user interface to input MIPS instructions, set latencies, configure station/buffer sizes, and load initial cache/register file values.
Instructions can be input manually or by uploading a text file containing the code.
The simulator will display the step-by-step execution of instructions, along with the state of reservation stations, buffers, register files, and cache.
Users can interact with the simulation by controlling its execution and observing the changes in the architectural state.

# Features

Step-by-step execution of MIPS instructions using the Tomasulo algorithm.
Handling of hazards (RAW, WAR, WAW).
Configurable latencies for different instruction types.
User-configurable station/buffer sizes.
Ability to load initial cache/register file values.
Visualization of reservation stations, buffers, register files, and cache state during simulation.

# Screenshots

<img width="1000" alt="login" src="./screenshots/first page.png">
<img width="1000" alt="login" src="./screenshots/latency page.png">
<img width="1000" alt="login" src="./screenshots/reservation stations page.png">
<img width="1000" alt="login" src="./screenshots/cycle1 page.png">
<img width="1000" alt="login" src="./screenshots/cycle2 page.png">

# Acknowledgments

This project was developed as part of the coursework for Microprocessors (CSEN 702) course at the German University in Cairo (GUC).

## Contributors

This project is the result of the collaborative efforts of a talented group of individuals. We extend our heartfelt gratitude to each contributor for their dedication and hard work.

- **[Omar Ahmed Saad](https://github.com/OMAR-AHMED-SAAD)**
- **[Aly Raafat](https://github.com/alyraafat)**
- **[Omar Ashraf](https://github.com/OmarAshraf-02)**
- **[Bassel Farouk](https://github.com/basel68)**
- **[Karim Gamaleldin](https://github.com/karimgamaleldin)**
- **[Marwan Amgad](https://github.com/marwanamgad)**
