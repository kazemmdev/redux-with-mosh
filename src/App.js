import configureStore from "./store";
import { buggAdded, getUnresolvedBugs, bugResolved } from "./store/bugs";
import { addProject, getProject } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(buggAdded({ description: "bug 1" }));
store.dispatch(buggAdded({ description: "bug 2" }));
store.dispatch(buggAdded({ description: "bug 3" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(addProject({ name: "Project 1" }));

const x = getUnresolvedBugs(store.getState());

// store.dispatch(buggAdded({ description: "bug 4" }));
// store.dispatch(bugResolved({ id: 4 }));

const y = getUnresolvedBugs(store.getState());

console.log(x === y);

function App() {
  return <div>code with mosh</div>;
}

export default App;
