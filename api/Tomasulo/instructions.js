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
    A: parseInt(address),
  };
};

export const Load = (address) => {
  return {
    busy: 1,
    op: "load",
    Vj: 0,
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: parseInt(address),
  };
};

export const Store = (address) => {
  return {
    busy: 1,
    op: "store",
    Vj: 0,
    Vk: 0,
    Qj: 0,
    Qk: 0,
    Time: -1,
    A: parseInt(address),
  };
};
