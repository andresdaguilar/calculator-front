import React from 'react';
import './App.css';
import AppProvider from './context/AppContext';
import Home from './Home/Home';





function App() {
  return (
    <AppProvider>      
        <Home />      
    </AppProvider>
  );
}

export default App;
