import logo from './logo.svg';
import './App.css';
import CategoriesMainComponent from './components/CategoriesMainComponent';
import TasksMainComponent from './components/TasksMainComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ToDo List
        </p>
      </header>
      <main class="App-MainContainer">
          <div class="App-CategoriesColumn">
            <CategoriesMainComponent />
          </div>
          <div class="App-TasksColumn">
            <TasksMainComponent />
          </div>
      </main>
    </div>
  );
}

export default App;
