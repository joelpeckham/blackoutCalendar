// import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calendar className = "Calendar" year={2022} month={11} target={15}/>
      </header>
    </div>
  );
}

export default App;
