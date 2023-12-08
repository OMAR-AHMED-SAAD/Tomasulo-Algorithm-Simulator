export const AddI = (val) => {
  return {
    busy: 1,
    op: "addi",
    Vj: 0,
    Vk: parseInt(val),
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: 0,
  };
};

export const SubI = (val) => {
  return {
    busy: 1,
    op: "subi",
    Vj: 0,
    Vk: parseInt(val),
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: 0,
  };
};

export const Add = () => {
  return {
    busy: 1,
    op: "add",
    Vj: 0,
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: 0,
  };
};

export const Sub = () => {
  return {
    busy: 1,
    op: "sub",
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: 0,
  };
};

export const Mul = () => {
  return {
    busy: 1,
    op: "mul",
    Vj: 0,
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: 0,
  };
};

export const Div = () => {
  return {
    busy: 1,
    op: "div",
    Vj: 0,
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: 0,
  };
};

export const Bnez = (address) => {
  return {
    busy: 1,
    op: "bnez",
    Vj: 0,
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: address,
  };
};

export const Load = (address) => {
  return {
    busy: 1,
    op: "load",
    // Vj: 0,
    // Vk: 0,
    // Qj: 0,
    // Qk: 0,
    Time: -1,
    A: parseInt(address),
  };
};

export const Store = (address) => {
  return {
    busy: 1,
    op: "store",
    Vj: 0,
    // Vk: 0,
    Qj: 0,
    // Qk: 0,
    Time: -1,
    A: parseInt(address),
  };
};

export const doLogic = (station, cache) => {
  const x = station.Vj;
  const y = station.Vk;
  switch (station.op) {
    case "add":
    case "addi":
      return addLogic(x, y);
    case "sub":
    case "subi":
      return subLogic(x, y);
    case "mul":
      return multLogic(x, y);
    case "div":
      return divLogic(x, y);
    case "load":
      return loadLogic(station.A, cache);
  }
};
const addLogic = (x, y) => {
  return x + y;
};

const subLogic = (x, y) => {
  return x - y;
};

const multLogic = (x, y) => {
  return x * y;
};

const divLogic = (x, y) => {
  return x / y;
};

const loadLogic = (address, cache) => {
  return cache[address];
};
