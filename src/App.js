import logo from './logo.svg';
import './App.css';
import CategoriesMainComponent from './components/CategoriesMainComponent';
import TasksMainComponent from './components/TasksMainComponent';
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState({
    id: "0",
    title: "All"
  })

  function selectCategory(category) {
    setSelectedCategory(category)
    console.log(category)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ToDo List
        </p>
      </header>
      <main className="App-MainContainer">
        <div className="App-CategoriesColumn">
          <CategoriesMainComponent selectCategory={selectCategory}  selectedCategory={selectedCategory}/>
        </div>
        <div className="App-TasksColumn">
          <TasksMainComponent selectedCategory={selectedCategory} />
        </div>
      </main>
    </div>
  );
}

export default App;