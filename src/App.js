// import {use,useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
// import About from './components/About';
// import Contact from './components/Contact';
import './App.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
    </Switch>
  </Router>
)

export default App
