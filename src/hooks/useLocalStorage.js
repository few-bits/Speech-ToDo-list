import { useState, useEffect } from 'react'

const getStorageValue = (key, initValue) => {
  const saved = localStorage.getItem(key)
  return saved !== null ? JSON.parse(saved) : initValue
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value]);

  return [value, setValue];
}