import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home/home';
import CategoryProduct from './components/categoryProduct/categoryProduct';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/home' component={Home}/>
      <Route path='/category/:id' component={CategoryProduct}/>
    </BrowserRouter>
  );
}

export default App;
