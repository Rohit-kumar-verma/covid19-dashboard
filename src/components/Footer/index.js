import './index.css'
import {BsInstagram} from 'react-icons/bs'
import {FiTwitter, FiGithub} from 'react-icons/fi'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="logo-name">
        COVID19<span>INDIA</span>
      </h1>
      <p className="footer-text">
        We stand with the everyone fighting on the front lines
      </p>
      <div className="icons">
        <FiGithub className="vector-icon" />
        <BsInstagram className="instagram-icon" />
        <FiTwitter className="twitter-icon" />
      </div>
    </div>
  )
}
