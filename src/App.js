import configureStore from "./store/configureStore";
import {
  bugAdded,
  getUnresolvedBugs,
  getBugsByUser,
  bugResolved,
  getUserBug,
  bugAssignToUser,
  loadBugs,
  addBug,
  assignBugToUser,
  resolveBug,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from "./store/api";

const store = configureStore();

// store.subscribe(() => {
//   console.log("Store Changed!", store.getState());
// });

// store.dispatch(loadBugs());

// setTimeout(() => {
//   store.dispatch(assignBugToUser(1, 4));
// }, 2000);

function App() {
  return <div>code with mosh</div>;
}

export default App;
