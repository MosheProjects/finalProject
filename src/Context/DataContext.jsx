import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [dataState, setDataState] = useState(null);

  useEffect(() => {
    fetch('https://api.npoint.io/d780eda5ed5041e4be62')
    .then((response) => response.json())
    .then((data) => {
        setDataState(data);
    })
  }, [])
  
  let value = {dataState}
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}