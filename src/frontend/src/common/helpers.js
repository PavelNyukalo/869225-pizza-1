export const normalizeData = (item, types) => {
  return {
    ...item,
    type: types.find(({ label }) => item.name === label)?.value,
  };
};

export const addCount = (item) => {
  return {
    ...item,
    count: 0,
  };
};

export const addDefaultChecked = (item, defaultType) => {
  return {
    ...item,
    defaultChecked: item.type === defaultType,
  };
};

export const addFullPrice = (item) => {
  return {
    ...item,
    fullPrice: 0,
  };
};
