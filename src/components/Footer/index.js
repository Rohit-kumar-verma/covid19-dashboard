import './index.css'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import {VscGithubAlt} from 'react-icons/vsc'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="logo-name">
        COVID19<span>INDIA</span>
      </h1>
      <p className="footer-text">
        we stand with everyone fighting on the front lines
      </p>
      <div className="icons">
        <VscGithubAlt className="vector-icon" />
        <FiInstagram className="instagram-icon" />
        <FaTwitter className="twitter-icon" />
      </div>
    </div>
  )
}
