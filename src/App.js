import configureStore from "./store/configureStore";
import { buggAdded, bugRemoved, bugResolved } from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(buggAdded({description: "hello"}));
store.dispatch(bugResolved({id: 1}));
store.dispatch(bugRemoved({id: 1}));

function App() {
  return <div>code with mosh</div>;
}

export default App;
