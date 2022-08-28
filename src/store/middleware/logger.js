const logger = (params) => (store) => (next) => (action) => {
  // console.log("params", params);
  return next(action);
};

export default logger;
