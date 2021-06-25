import React, { useContext, createContext, useReducer } from "react";

const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("App Context must be used within AppProvider");
  }
  return context;
}

const initialState = {
  user: {
    username: "",
    money: 9.99,
  },

  gameHistory: [],
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    case "LOGOUT":
      return initialState;
    case "INCREMENT_MONEY":
      return {
        ...state,
        user: {
          username: state.user.username,
          money: state.user.money + action.payload,
        },
      };
    case "DECREMENT_MONEY":
      return {
        ...state,
        user: {
          username: state.user.username,
          money: state.user.money - 1,
        },
      };
    case "SET_GAME_HISTORY":
      return { ...state, gameHistory: [...action.payload] };
    default:
      throw new Error(`Action type ${action.type} is not found`);
  }
}

export function AppProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}
