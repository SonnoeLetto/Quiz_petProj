import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import rootReducers from "./store/reducers/rootReducers";
import { thunk } from 'redux-thunk';
import Logout from './components/Logout/Logout';

const store = createStore(rootReducers, applyMiddleware(thunk));
const state = store.getState()
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/auth',
        element: state.auth.token ? <QuizList /> : <Auth />
      },
      {
        path: '/quiz-creator',
        element: <QuizCreator />
      },
      {
        path: '/',
        element: <QuizList />
      },
      {
        path: '/quiz/:id',
        element: <Quiz />,

      },
      {
        path: 'logout',
        element: !state.auth.token? <Logout/> : <Quiz />,

      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

