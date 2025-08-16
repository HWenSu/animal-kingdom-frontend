import { createContext, useContext, useReducer } from "react";
import { initialState, filterReducer } from "../utility/filterReducer";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [filter, dispatch] = useReducer(filterReducer, initialState);

  return (
    <FilterContext.Provider value={{ filter, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");

  return ctx;
}
