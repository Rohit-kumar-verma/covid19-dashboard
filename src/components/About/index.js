import {useState, useEffect} from 'react'
import Footer from '../Footer'
import './index.css'

export default function About() {
  const [faqsData, setFaqsData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/covid19-faqs')
        const data = await response.json()
        console.log(data)
        setFaqsData(data.factoids)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="about-container">
      <div className="about-header-container">
        <h2 className="main-heading">About</h2>
        <p className="heading-text">Last updated on march 28th 2021</p>
      </div>
      <ul className="about-banner-text">
        {faqsData.map(element => (
          <li>{element.banner}</li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}
