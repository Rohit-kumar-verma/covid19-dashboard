import {useState, useEffect} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import LoadingSpinner from '../LoadingSpinner'
import './index.css'

export default function About() {
  const [faqsData, setFaqsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/covid19-faqs')
        const data = await response.json()
        console.log(data)
        setFaqsData(data.factoids)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const renderAboutData = (
    <>
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
    </>
  )

  return (
    <div className="about-container">
      <Header />
      {isLoading ? <LoadingSpinner /> : renderAboutData}
    </div>
  )
}
