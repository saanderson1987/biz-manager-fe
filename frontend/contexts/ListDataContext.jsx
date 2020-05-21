import React, {
  createContext,
  useRef,
  useMemo,
  useEffect,
  useReducer,
} from "react";
import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import unset from "lodash.unset";
import update from "lodash.update";

export const ListDataContext = createContext({});

const useReducerWithLogger = (reducer, initialState) => {
  let prevState = useRef(initialState);
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithLogger = useMemo(() => {
    return (action) => {
      const statePathString = action.statePath
        ? ` at ${JSON.stringify(action.statePath)}`
        : "";
      console.groupCollapsed(action.type + statePathString);
      console.log("oldState:", prevState.current);
      console.log("data:", action.data);
      return dispatch(action);
    };
  }, [dispatch]);

  useEffect(() => {
    if (state !== initialState) {
      console.log("newState:", state);
      console.groupEnd();
    }
    prevState.current = state;
  }, [state]);

  return [state, dispatchWithLogger];
};

export const ListDataContextProvider = ({ type, children }) => {
  const reducer = (oldState, action) => {
    switch (action.type) {
      case "mergeListItems":
        return update(cloneDeep(oldState), action.statePath, (currVal) =>
          merge({}, currVal, action.data)
        );
      case "mergeListItem":
        return update(
          cloneDeep(oldState),
          [...action.statePath, action.data.id],
          (currVal) => merge({}, currVal, action.data)
        );
      case "removeListItem":
        const newState = cloneDeep(oldState);
        unset(newState, [...action.statePath, action.data]);
        return newState;
      case "logError":
        return { ...oldState, error: action.data };
      default:
        return oldState;
    }
  };

  const initialState = {
    [type]: {},
  };

  let _useReducer = useReducer;
  if (process.env.NODE_ENV === "development") {
    _useReducer = useReducerWithLogger;
  }

  const [listDataStore, dispatchToListDataStore] = _useReducer(
    reducer,
    initialState
  );

  return (
    <ListDataContext.Provider
      value={{
        listDataStore,
        dispatchToListDataStore,
        error: listDataStore.error,
      }}
    >
      {children}
    </ListDataContext.Provider>
  );
};
