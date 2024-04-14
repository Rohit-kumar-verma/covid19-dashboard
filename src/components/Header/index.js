import {Link} from 'react-router-dom'
import './index.css'

export default function Header() {
  return (
    <div>
      <nav>
        <div className="navbar-container">
          <ul className="nav-items-block">
            <Link to="/">
              <li className="logo-name">
                COVID19<span>INDIA</span>
              </li>
            </Link>
            <Link to="/">
              <li className="nav-list">Home</li>
            </Link>
            <Link to="/about">
              <li className="nav-list">About</li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}
