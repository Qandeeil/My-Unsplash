import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import AppSignIn from './App-Registration/App-SignIn';
import AppSignUp from './App-Registration/App-SignUp';
import AppProfile from './App-Registration/App-Profile';
import Visitor from './Visitor/Visitor';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<AppSignIn />}/>
          <Route path='/SignUp' element={<AppSignUp />}/>
          <Route path='/Profile/:_id' element={<AppProfile />}/>
          <Route path='/Profiles/:_id' element={<Visitor />}/>
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);