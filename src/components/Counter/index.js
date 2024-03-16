import {Component} from 'react'
import {FaRegCheckCircle} from 'react-icons/fa'

import './index.css'

class Counter extends Component {
  render() {
    return (
      <div className="counter-container">
        <div className="confirmed-count count-block">
          <p>Confirmed</p>
          <FaRegCheckCircle />
          <p>34285612</p>
        </div>
        <div className="active-count count-block">
          <p>Active</p>
          <FaRegCheckCircle />
          <p>165803</p>
        </div>
        <div className="recovered-count count-block">
          <p>Recovered</p>
          <FaRegCheckCircle />
          <p>33661339</p>
        </div>
        <div className="deceased-count count-block">
          <p>Deceased</p>
          <FaRegCheckCircle />
          <p>458470</p>
        </div>
      </div>
    )
  }
}

export default Counter
