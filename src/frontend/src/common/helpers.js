export const normalizeData = (item, types) => {
  return {
    ...item,
    type: types.find(({ label }) => item.name === label)?.value,
  };
};

export const addCountIngredients = (item) => {
  return {
    ...item,
    count: 0,
  };
};
