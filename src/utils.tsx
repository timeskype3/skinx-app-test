
const loadLocalStorage = (key: string) => {
  try {
    const serializedItem = localStorage.getItem(key);
    if (serializedItem === null) { return undefined } else {
      return JSON.parse(serializedItem);
    }
  } catch (error: unknown) {
    return undefined;
  }
}

export {
  loadLocalStorage,
}
