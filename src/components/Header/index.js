import {NavLink} from 'react-router-dom'
import './index.css'

export default function Header() {
  //   const [isOpen, setIsOpen] = useState(false)

  //   const toggleMenu = () => {
  //     setIsOpen(!isOpen)
  //   }

  return (
    <div>
      <nav>
        <div className="navbar-container">
          <ul className="nav-items-block">
            <li className="logo-name">
              <a href="/">
                COVID19<span>INDIA</span>
              </a>
            </li>
            <li className="menu-bar-items">
              <ul>
                <li className="nav-list">
                  <NavLink exact to="/" activeClassName="custom-active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-list">
                  <NavLink exact to="/about" activeClassName="custom-active">
                    About
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
