import store from "./store";
import { buggAdded, bugRemoved, bugResolved } from "./store/actions";

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(buggAdded("hello"));
store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));

function App() {
  return <div>code with mosh</div>;
}

export default App;
