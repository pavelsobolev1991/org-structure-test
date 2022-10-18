import Department from "./components/Department/Department";
import useMoveCard from "./components/hooks/useMoveCard";
import "./styles.css";

function App() {
  const { state, moveCard } = useMoveCard();

  return (
    <>
      <div className="App">
        <div className="container">
        <button onClick={()=>localStorage.clear()} className="btn_clear">Очистить LocalStorage</button>
          <div className="org-tree">
            <Department organization={state} moveCard={moveCard} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;



