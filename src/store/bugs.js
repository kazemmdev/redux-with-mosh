const BUG_ADDED = "bugAdded";
const BUG_RESOLVED = "bugResolved";
const BUG_REMOVED = "bugRemoved";

export const buggAdded = (description) => ({
  type: BUG_ADDED,
  payload: { description },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: { id },
});

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: { id },
});

export default function reducer(state = [], action) {
  switch (action.type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++state.length,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case BUG_RESOLVED:
      return state.map((bug) => (bug.id === action.payload.id ? { ...bug, resolved: true } : bug));
    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}
