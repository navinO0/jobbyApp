import {Switch, BrowserRouter, Route} from 'react-router-dom'

import './App.css'

import JobsRoute from './components/JobsRoute'

import LoginForm from './components/LoginForm/index'

import Home from './components/Home/index'

import JobsItemDetailsRoute from './components/JobItemDetailsRoute/index'

import ProtectedRoute from './components/ProtectedRoute/index'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobsItemDetailsRoute} />
    </Switch>
  </BrowserRouter>
)

export default App
