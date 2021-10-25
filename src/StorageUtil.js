export const StorageUtil = () => {
  const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadData = key => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  };

  return {
    saveData,
    loadData,
  };
};
