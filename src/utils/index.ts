import type { PhaseType } from "../types";

export const loadPhasesFromLocalStorage = () => {
  const phasesData = localStorage.getItem("phases");
  if (phasesData) {
    const parsedPhases: PhaseType[] = JSON.parse(phasesData);
    return parsedPhases;
  }
};

export const savePhasesToLocalStorage = (phases: PhaseType[]) => {
  localStorage.setItem("phases", JSON.stringify(phases));
};
