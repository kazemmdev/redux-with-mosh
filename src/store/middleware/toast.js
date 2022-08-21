const toast = (store) => (next) => (action) => {
  if (action.type == "error") {
    console.error("Toastify: ", action.message);
  } else next(action);
};

export default toast;
