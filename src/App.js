// import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import React from 'react';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Calendar className = "Calendar" year={2022} month={11} target={null}/>
        <Calendar className = "Calendar" year={2023} month={0} target={null}/>
        <Calendar className = "Calendar" year={2023} month={1} target={20}/>
        <Calendar className = "Calendar" year={2023} month={2} target={null}/>
      </header>
    </div>
  );
}

export default App;
