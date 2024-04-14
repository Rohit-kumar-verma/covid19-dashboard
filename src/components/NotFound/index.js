import {Link} from 'react-router-dom'
import './index.css'

export default function NotFound() {
  return (
    <div className="not-found-container">
      <img src="./img/Group 7484.png" alt="not-found-pic" />
      <h1>PAGE NOT FOUND</h1>
      <p>we are sorry, the page you requested could not be found</p>
      <Link to="/">
        <button className="find-job-btn" type="button">
          Home
        </button>
      </Link>
    </div>
  )
}
