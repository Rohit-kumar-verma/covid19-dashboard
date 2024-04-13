import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
// import Contact from './components/Contact';
import './App.css'
import StateDetails from './components/StateDetails'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/:stateCode" component={StateDetails} />
    </Switch>
  </Router>
)

export default App
