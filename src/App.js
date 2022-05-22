// import logo from './logo.svg';
import './App.css';
import CalendarCarousel from './components/CalendarCarousel.tsx';
import React from 'react';

function App() {
  let dates = [
    {
      month: 0,
      year: 2020,
    },
    {
      month: 1,
      year: 2020,
    },
    {
      month: 2,
      year: 2020,
    },
  ]
  return (
    <div className="App">
      <header className="App-header">
        <CalendarCarousel dates={dates}/>
      </header>
    </div>
  );
}

export default App;
