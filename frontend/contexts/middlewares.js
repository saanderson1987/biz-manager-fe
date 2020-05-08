export const logger = ({ getState }) => (next) => (action) => {
  console.groupCollapsed(
    `${action.type} at ${JSON.stringify(action.statePath)}`
  );
  console.log("oldState:", getState());
  console.log("data:", action.data);
  next(action);
  console.log("newState:", getState());
  console.groupEnd();
};
