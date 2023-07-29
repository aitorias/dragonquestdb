import "./App.css";

import MonsterList from "./components/MonsterList/MonsterList";

import monsterData from "./api/dragonquestmonsters.json";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <MonsterList monsters={monsterData} />
      </main>
    </div>
  );
}

export default App;
