import { createContext, useContext } from "react";

const JetContext = createContext();

export function useJetContext() {
  return useContext(JetContext);
}

export default JetContext;
