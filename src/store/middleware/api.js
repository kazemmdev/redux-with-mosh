import axios from "axios";
import * as actions from "../api";

const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { method, data, url, onStart, onSuccess, onError } = action.payload;

  if (onStart) store.dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      url,
      method,
      data,
      baseURL: "http://localhost:9001/api",
    });
    store.dispatch(actions.apiCallSuccess(response.data)); // general
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data }); // specific
  } catch (error) {
    store.dispatch(actions.apiCallFailed(error.message)); // general
    if (onError) store.dispatch({ type: onError, payload: error.message }); // specific
  }
};

export default api;
