import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  // const basketFromJSON = localStorage.getItem("basket");

  const [basket, setBasket] = useState({});

  const addToBasket = (id, count) => {
    // const basketFromJSON = JSON.stringify(basket);
    setBasket((basket) => ({ ...basket, [id]: count }));
    // localStorage.setItem("basket", basketFromJSON);
  };

  const clearBasket = () => {
    setBasket({});
    // localStorage.removeItem("basket");
  };

  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const saveUserName = (userName) => {
    setUserName(userName);
    localStorage.setItem("userName", userName);
  };

  return (
    <AppContext.Provider
      value={{ userName, saveUserName, basket, addToBasket, clearBasket }}
    >
      {children}
    </AppContext.Provider>
  );
};
