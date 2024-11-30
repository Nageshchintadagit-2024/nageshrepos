import './App.css'

import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import Home from './components/Home'

import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={LoginForm} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
