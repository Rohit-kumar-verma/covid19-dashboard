import {useState, useEffect} from 'react'

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
    <div className="About-container">
      <div className="about-header-container">
        <h2 className="about-heading">About</h2>
        <p>Last updated on march 28th 2021</p>
      </div>
      <ul>
        {faqsData.map(element => (
          <li>{element.banner}</li>
        ))}
      </ul>
    </div>
  )
}
