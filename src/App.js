import configureStore from "./store";
import { buggAdded, bugRemoved, bugResolved } from "./store/bugs";
import { addProject } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(buggAdded({ description: "hello" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugRemoved({ id: 1 }));
store.dispatch(addProject({ name: "Project 1" }));

function App() {
  return <div>code with mosh</div>;
}

export default App;
