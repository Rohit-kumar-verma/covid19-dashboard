// import {use,useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
// import About from './components/About';
// import Contact from './components/Contact';
import './App.css'
import StateDetails from './components/StateDetails'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
      <Route exact path="/state" component={StateDetails} />
    </Switch>
  </Router>
)

export default App
