import logo from './logo.svg';
import './App.css';
import CategoriesMainComponent from './components/CategoriesMainComponent';
import TasksMainComponent from './components/TasksMainComponent';
import { useState } from "react";

function App() {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("0")

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
          <CategoriesMainComponent categories={categories} setCategories={setCategories} setSelectedCategoryId={setSelectedCategoryId} selectedCategoryId={selectedCategoryId} />
        </div>
        <div className="App-TasksColumn">
          <TasksMainComponent categories={categories} selectedCategoryId={selectedCategoryId} />
        </div>
      </main>
    </div>
  );
}

export default App;