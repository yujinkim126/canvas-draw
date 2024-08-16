import DrawSignaturePad from "./Components/DrawSignaturePad";
import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
      <h2>직접 구현</h2>
      <Home />
      <h2>라이브러리</h2>
      <DrawSignaturePad />
    </div>
  );
}

export default App;
