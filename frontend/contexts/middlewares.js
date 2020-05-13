export const logger = ({ getState }) => (next) => (action) => {
  const statePathString = action.statePath
    ? ` at ${JSON.stringify(action.statePath)}`
    : "";
  console.groupCollapsed(action.type + statePathString);
  console.log("oldState:", getState());
  console.log("data:", action.data);
  next(action);
  console.log("newState:", getState());
  console.groupEnd();
};
