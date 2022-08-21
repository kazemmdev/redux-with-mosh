const logger = (params) => (store) => (next) => (action) => {
  console.log("params", params);
  next(action);
};

export default logger;
