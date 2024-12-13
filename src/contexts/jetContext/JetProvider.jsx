import React, { useState, useEffect } from "react";
import JetContext from "./JetContext";
import axios from "axios";

export function CoursesProvider({ children }) {
 console.warn("her sey yaxsiidfr")

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
}
