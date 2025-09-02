import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import SnackBar from "../components/SnackBar";
const SnackBarContext = createContext("");
export function SnackBarProvider({ children }) {
  const [open, setOpen] = useState({ state: false, value: "" });
  function handleClick(displayedVal, stateVal) {
    setOpen({ state: stateVal, value: displayedVal });
  }
  return (
    <>
      <SnackBarContext.Provider value={handleClick}>
        <SnackBar open={open.state} value={open.value} />
        {children}
      </SnackBarContext.Provider>
    </>
  );
}
export const useSnack = () => {
  return useContext(SnackBarContext);
};
