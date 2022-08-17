function reducer(state = [], action) {
  switch (action.type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: state.length++,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case "bugResolved":
      let index = state.findIndex((bug) => bug.id === action.payload.id);
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          resolved: true,
        },
        ...state.slice(index),
      ];
    case "bugRemoved":
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}
