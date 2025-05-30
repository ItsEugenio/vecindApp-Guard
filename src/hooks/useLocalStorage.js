import { useState } from "react";

export function useLocalStorage(key,initialValue){
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item !==null ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log("Error al leer el valor de localStorage", error)
            return initialValue;
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log("error al setear el valor a localStorage",error)
        }
    }

    const removeValue = () => {
        try {
          localStorage.removeItem(key);
          setStoredValue(undefined);
        } catch (error) {
          console.error("Error removing from localStorage", error);
        }
      };

    return [storedValue, setValue, removeValue];
}