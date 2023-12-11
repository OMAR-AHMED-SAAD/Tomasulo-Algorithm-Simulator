import { AddI, SubI, Add, Sub, Mul, Div, Bnez, Load, Store } from "./instructions.js";
export const parseInstruction = (str) => {
  let li = str.split(" ");
  li[1] = li[1].split(",");
  li = li.flat();
  let operationName = li[0].toLowerCase();
  if (operationName.includes("addi")) {
    return ["A", AddI(li[3]), li[1], li[2], li[3]];
  } else if (operationName.includes("subi")) {
    return ["A", SubI(li[3]), li[1], li[2], li[3]];
  } else if (operationName.includes("add")) {
    return ["A", Add(), li[1], li[2], li[3]];
  } else if (operationName.includes("sub")) {
    return ["A", Sub(), li[1], li[2], li[3]];
  } else if (operationName.includes("mul")) {
    return ["M", Mul(), li[1], li[2], li[3]];
  } else if (operationName.includes("div")) {
    return ["M", Div(), li[1], li[2], li[3]];
  } else if (operationName.includes("bnez")) {
    return ["A", Bnez(li[2]), null, li[1], li[2]];
  } else if (operationName.includes("l.d")) {
    return ["L", Load(li[2]), null, li[1], li[2]];
  } else if (operationName.includes("s.d")) {
    return ["S", Store(li[2]), null, li[1], li[2]];
  }
};

export const fillRegisterFile = (registerFile) => {
  for (let i = 0; i < 32; i++) {
    registerFile[`R${i}`] = {
      value: i,
      Qi: 0,
    };
  }
  for (let i = 0; i < 32; i++) {
    registerFile[`F${i}`] = {
      value: i,
      Qi: 0,
    };
  }
};

export const fillReservationStationsAndBuffers = (type, count, reservationStation) => {
  for (let i = 1; i <= count; i++) {
    reservationStation[`${type}${i}`] = {
      busy: 0,
      op: "-",
      Vj: 0,
      Vk: 0,
      Qj: 0,
      Qk: 0,
      Time: 0,
      A: 0,
    };
  }
};

export const fillLoadBuffer = (loadBuffer, count) => {
  for (let i = 1; i <= count; i++) {
    loadBuffer[`L${i}`] = {
      busy: 0,
      op: "-",
      Time: 0,
      A: 0,
    };
  }
};

export const fillStoreBuffer = (storeBuffer, count) => {
  for (let i = 1; i <= count; i++) {
    storeBuffer[`S${i}`] = {
      busy: 0,
      op: "-",
      Vj: 0,
      Qj: 0,
      Time: 0,
      A: 0,
    };
  }
};
