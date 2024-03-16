import {Component} from 'react'
import {FaRegCheckCircle} from 'react-icons/fa'

// import './index.css'

class Counter extends Component {
  render() {
    return (
      <div className="grid grid-cols-4 gap-4">
        <div className="">
          <p>Confiremed</p>
          <FaRegCheckCircle />
          <p>34285612</p>
        </div>
        <div className="">
          <p>Confiremed</p>
          <FaRegCheckCircle />
          <p>34285612</p>
        </div>
        <div className="">
          <p>Confiremed</p>
          <FaRegCheckCircle />
          <p>34285612</p>
        </div>
        <div className="">
          <p>Confiremed</p>
          <FaRegCheckCircle />
          <p>34285612</p>
        </div>
      </div>
    )
  }
}

export default Counter
