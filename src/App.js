import './App.css';
import { UseState } from "./UseState.js";
import { UseRedcuer } from "./UseReducer.js";

function App() {
  return (
    <div className="App">
      <UseState name="UseState" />
      <UseRedcuer name="Use Reducer" />
    </div>
  );
}

export default App;
