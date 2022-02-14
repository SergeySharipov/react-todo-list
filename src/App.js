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
      <main>
        <div class="row">
          <CategoriesMainComponent />
          <TasksMainComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
