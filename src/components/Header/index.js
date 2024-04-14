import {useState} from 'react'
import './index.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
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
            <li className="nav-list">
              <a href="/">Home </a>
            </li>
            <li className="nav-list">
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
