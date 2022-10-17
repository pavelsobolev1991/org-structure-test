import React, { useCallback,FC } from "react";
import "./styles.css";
import Department from "./components/Department/Department";
import useMoveCard from "./components/hooks/useMoveCard";

function App() {

  const {state, moveCard} = useMoveCard()
 
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="org-tree">
            <Department organization={state} moveCard={moveCard} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
