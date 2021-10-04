import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

//Before Login
const INITIAL_STATE = {
  //if there is user in local storage, take this user
  //if no user then take Null
  user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };

  //Creating Context and exporting
  export const Context = createContext(INITIAL_STATE);

  //Context provider will be used in App.js
  //So that user data can be accessed by all chidren
  export const ContextProvider = ({ children }) => {
      //INITIAL_STATE= which state this reducer will use to update 
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  
    //whenever state of user changes,save this into local_storage
    
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);


    return (
        //value= What value or data to pass to children
        //dispatch= It will check if Login successful or Error
      <Context.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </Context.Provider>
    );
  }; 