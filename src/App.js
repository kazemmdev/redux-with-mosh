import configureStore from "./store";
import {
  bugAdded,
  getUnresolvedBugs,
  getBugsByUser,
  bugResolved,
  getUserBug,
  bugAssignToUser,
  loadBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import * as actions from "./store/api";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(loadBugs());

function App() {
  return <div>code with mosh</div>;
}

export default App;
