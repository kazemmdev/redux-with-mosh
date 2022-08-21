import configureStore from "./store";
import { bugAdded, getUnresolvedBugs, getBugsByUser, bugResolved, getUserBug, bugAssignToUser } from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(bugAdded({ description: "bug 1" }));
store.dispatch(bugAdded({ description: "bug 2" }));
store.dispatch(bugAdded({ description: "bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(projectAdded({ name: "project 1" }));

store.dispatch(userAdded({ name: "user 1" }));
store.dispatch(userAdded({ name: "user 2" }));
store.dispatch(bugAssignToUser({ userId: 1, bugId: 1 }));
store.dispatch(bugAssignToUser({ userId: 1, bugId: 2 }));

console.warn(getBugsByUser(1)(store.getState()));

function App() {
  return <div>code with mosh</div>;
}

export default App;
