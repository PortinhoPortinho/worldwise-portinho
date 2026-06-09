import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContexts = createContext();

const initialValue = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "Loading":
      return { ...state, isLoading: true };

    case "cities/Loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/Loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}, // add this line
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  /*const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);*/
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialValue,
  );
  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "Loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/Loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error with Data Fetching ",
        });
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "Loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/Loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error with Data Fetching " });
    }
  }

  async function CreateCity(newCity) {
    dispatch({
      type: "Loading",
    });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error with Creating a City " });
    }
  }

  async function DeleteCity(id) {
    dispatch({ type: "Loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Error with Deleting a City ",
      });
    }
  }

  return (
    <CitiesContexts.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        CreateCity,
        DeleteCity,
      }}
    >
      {children}
    </CitiesContexts.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContexts);
  if (context === undefined)
    throw new Error(
      "This is used outside the citiesProvider, kindly rectify your error",
    );
  return context;
}

export { CitiesProvider, useCities };
