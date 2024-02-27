import './index.css'

export default function Header() {
  return (
    <div>
      <nav>
        <div className="navbar-container">
          <h1 className="logo-name">
            COVID19<span>INDIA</span>
          </h1>
          <div className="nav-items-container">
            <ul className="nav-items-block">
              <li className="nav-list">Home</li>
              <li className="nav-list">About</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
