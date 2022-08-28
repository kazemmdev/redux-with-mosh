const toast = (store) => (next) => (action) => {
  if (action.type == "error") {
    console.error("Toastify: ", action.message);
  } else return next(action);
};

export default toast;
