import "./App.css";
import GiftForm from "./components/GiftForm";
import GiftsContext from "./components/GiftsContext";

function App() {
  return (
    <GiftsContext>
      <div className="App">
        <main>
          <GiftForm />
        </main>
      </div>
    </GiftsContext>
  );
}

export default App;
